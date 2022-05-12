function includesWholeWord(sentence, word) {
  var wholewordRegExp = new RegExp("\\b" + word + "\\b"); 
  return sentence.match(prefixRegExp) != null;
}

function includesPartialWord(sentence, word) {
  return sentence.includes(word);
}

function matchQuery(book, query, queryOptions) {
  if(queryOptions.wholeWord) {
    return includesWholeWord(book.title, query);
  } 
  return includesPartialWord(book.title, query);
}

function searchBooks(books, query, queryOptions) {
  return _.filter(books, function(book) {
    return matchQuery(book, query, queryOptions);
  });
}

function fullName(person) {
  return _.capitalize(person.firstName) + " "
    + _.capitalize(person.lastName);
}

function authorName(authors, authorID) {
  return fullName(authors[authorID]);
}

function setAuthorName(authors, book) {
    return _.set(book, "author", authorName(authors, book.authorID));
}

function enrichBooks(books, authors) {
  return _.map(books, function(book) {
    return setAuthorName(authors, book);
  });
}

function shouldReverse(sortingOptions) {
  return sortingOptions.order == "desc";
}

function maybeReverse(items, sortingOptions) {
  if(shouldReverse(sortingOptions)) {
    return _.reverse(items);
  }
  return items;
}

function sortByFields(items, sortingOptions) {
  return _.sortBy(items, sortingOptions.fields);
}

function sortBooks(books, sortingOptions) {
  var sortedBooks = sortByFields(books, sortingOptions);
  return maybeReverse(sortedBooks, sortingOptions);
}

function selectBookFields(book, fields) {
  var book = _.pick(book, fields);
  return _.omitBy(book, _.isUndefined);
}

function selectBooksFields(books, fields) {
  return _.map(books, function(book) {
    return selectBookFields(book, fields);
  });
}

function formatBooks(books, formattingOptions) {
  var sortedBooks = sortBooks(books, options.format.sort);
  return selectBooksFields(sortedBooks, options.format.fields);
}

function handleSearchQuery(catalog, query, options) {
  var books = searchBooks(catalog.books, query, options.query);
  var enrichedBooks = enrichBooks(books, catalog.authors);
  var sortedBooks = sortBooks(enrichedBooks, options.format.sort);
  return selectBooksFields(sortedBooks, options.format.fields);
}



