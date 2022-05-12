function handleSearchQuery(catalog, query, options) {
  // Finding books that match the query
  var prefixRegExp = new RegExp("\\b" + query + "\\b"); 
  var books = _.filter(catalog.books, function(book) {
    if(options.query.wholeWord) {
      return book.title.match(prefixRegExp) != null;
    } 
    return book.title.includes(query);
  });
  // Enriching books
  var enrichedBooks = _.map(books, function(book) {
    var author = catalog.authors[book.authorID];
    return _.set(book, "author",  
      _.capitalize(author.firstName) + 
      " " + _.capitalize(author.lastName));
  });
  // Sorting books according to options
  var sortingOptions = options.format.sort;
  var sortedBooks = _.sortBy(enrichedBooks, sortingOptions.fields);
  if(sortingOptions.order == "desc") {
    sortedBooks = _.reverse(sortedBooks);
  }
  // Selecting fields 
  var fields = options.format.fields;
  var formattedBooks = _.map(sortedBooks, function(book) {
    var book = _.pick(book, fields);
    return _.omitBy(book, _.isUndefined);
  });
  return formattedBooks;
}
