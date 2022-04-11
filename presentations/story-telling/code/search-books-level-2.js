function matchQueryFn(query, wholeWord) {
    return function (book) {
        if (wholeWord) {
            var prefixRegExp = new RegExp("\\b" +
                query + "\\b");
            return book.title.match(prefixRegExp) != null;
        }
        return book.title.includes(query);
    }
}


function searchBooks(books, query, queryOptions) {
    return _.filter(books, matchQueryFn(query, queryOptions.wholeWord));
}

