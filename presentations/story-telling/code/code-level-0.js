function handleSearchQuery(catalog, query, options) {
  var books = searchBooks(catalog.books, query, options.query);
  var enrichedBooks = enrichBooks(catalog, books, options);
  var result = formatBooks(enrichedBooks, options);
  return result;
}

function searchBooks(books, query, queryOptions) {
  var prefixLowerCase = query.toLowerCase();
  var prefixRegExp = new RegExp("\\b" + query); 
  return _.filter(books, function(book) {
    if(queryOptions.wholeWord) {
      return book.title.toLowerCase().match(prefixRegExp) != null;
    } 
    return book.title.includes(query);
  });
}

function enrichBooks(authors, books) {
  return _.map(books, function(book) {
    var author = authors[authorID];
    book.author = _.capitalize(author.firstName) + " " + _.capitalize(author.lastName);
    return book;
  });
}
