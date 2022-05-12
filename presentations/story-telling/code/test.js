var catalog = {
  "books": [   {
    "isbn": "978-1779501127",
    "title": "Watchmen",
    "publicationYear": 1987,
    "authorID": "alan-moore",
  }
  ],
  "authors": {
    "alan-moore": {
      "firstName": "Alan",
      "lastName": "Moore",
      "bookIsbns": ["978-1779501127"]
    },
    "dave-gibbons": {
      "name": "Dave Gibbons",
      "bookIsbns": ["978-1779501127"]
    }
  }
}

var options = {
  query: { wholeWord: false},
  format: {
    fields: ["title", "author"],
    sort: {fields: ["publicationYear"], order: "desc"}}
};

handleSearchQuery(catalog, "Wat", options);
