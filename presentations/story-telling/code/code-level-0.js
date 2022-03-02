function handleSearchQuery(catalog, query, options) {
  var prefixRegExp = new RegExp("\\b" + query.toLowerCase() + "\\b"); 
  var books = _.filter(catalog.books, function(book) {
    if(options.query.wholeWord) {
      return book.title.toLowerCase().match(prefixRegExp) != null;
    } 
    return book.title.includes(query);
  });
  var enrichedBooks = _.map(books, function(book) {
    var author = catalog.authors[book.authorID];
    book.author = _.capitalize(author.firstName) + " " + _.capitalize(author.lastName);
    return book;
  });
  var sortingOptions = options.format.sort
  var sortedBooks = _.sortBy(books, sortingOptions.fields);
  if(sortingOptions.order == "desc") {
    sortedBooks = _.reverse(sortedBooks);
  }
  var fields = options.format.fields;
  var formattedBooks = _.map(sortedBooks, function(book) {
    var book = _.pick(book, fields);
    return _.omitBy(book, _.isUndefined);
  });
  return formattedBooks;
}
