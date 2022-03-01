function hasWordStartingWith(sentence, prefix) {
  var sentenceLowerCase = sentence.toLowerCase();
  var prefixLowerCase = prefix.toLowerCase();
  var prefixRegExp = new RegExp("\\b" + prefixLowerCase); 
  return sentenceLowerCase.match(prefixRegExp) != null;
}

function matchQuery(book, query, queryOptions) {
  if(queryOptions.wholeWord) {
    return hasWordStartingWith(book.title, query);
  } 
  return book.title.includes(query);
}

function searchBooks(books, query, queryOptions) {
  return _.filter(books, function(book) {
    return matchQuery(book, query, queryOptions);
  });
}

function fullName(person) {
  return _.capitalize(person.firstName) + " " + _.capitalize(person.lastName);
}

function authorName(authors, authorID) {
  return fullName(authors[authorID]);
}

function enrichBooks(authors, books) {
  return _.map(books, function(book) {
    book.author = authorName(authors, book.authorID);
    return book;
  });
}

function sortBooks(books, sortingOptions) {
  var sortedBooks = _.sortBy(books, sortingOptions.fields);
  if(sortingOptions.order == "desc") {
    return _.reverse(sortedBooks);
  }
  return sortedBooks;
}

function pickBookFields(book, fields) {
  var book = _.pick(book, fields);
  return _.omitBy(book, _.isUndefined);
}

function pickFields(books, fields) {
  return _.map(books, function(book) {
  return pickBookFields(book, fields);
  });
}

function formatBooks(books, formattingOptions) {
  var sortedBooks = sortBooks(books, formattingOptions.sort);
  return pickFields(sortedBooks, formattingOptions.fields);
}

function handleSearchQuery(catalog, query, options) {
  var books = searchBooks(catalog.books, query, options.query);
  var enrichedBooks = enrichBooks(catalog.authors, books);
  var result = formatBooks(enrichedBooks, options.format);
  return result;
}
