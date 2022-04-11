function searchBooks(books, query, queryOptions) {
  var prefixRegExp = new RegExp("\\b" + query + "\\b");
  return _.filter(books, function (book) {
    if (queryOptions.wholeWord) {
      return book.title.match(prefixRegExp) != null;
    }
    return book.title.includes(query);
  });
}

function enrichBooks(authors, books) {
  return _.map(books, function (book) {
    var author = authors[book.authorID];
    book.author = _.capitalize(author.firstName) +
      " " + _.capitalize(author.lastName);
    return book;
  });
}

function formatBooks(books, formattingOptions) {
  var sortingOptions = formattingOptions.sort
  var sortedBooks = _.sortBy(books, sortingOptions.fields);
  if (sortingOptions.order == "desc") {
    sortedBooks = _.reverse(sortedBooks);
  }
  var fields = formattingOptions.fields;
  var formattedBooks = _.map(books, function (book) {
    var book = _.pick(book, fields);
    return _.omitBy(book, _.isUndefined);
  });
  return formattedBooks;
}

function handleSearchQuery(catalog, query, options) {
  var books = searchBooks(catalog.books, query, options.query);
  var enrichedBooks = enrichBooks(catalog.authors, books);
  return formatBooks(enrichedBooks, options.format);
}
