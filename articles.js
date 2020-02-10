let _articles = require('./articles.json');
const extras = require('./extras');
const validation = require('./validations')
const articles = exports;

const sortFieldDefault = "date";
const sortOrderDefault = "desc";
const pageDefault = 1;
const limitPageDefault = 10;
const includeDepsDefault = false;


articles.readAll = function (req, res, payload, cb) {
    const sortField   = payload.sortField === undefined ? sortFieldDefault : payload.sortField;
    const sortOrder   = payload.sortOrder === undefined ? sortOrderDefault : payload.sortOrder;
    const page        = payload.page === undefined ? pageDefault : payload.page;
    const limitPage   = payload.limitPage === undefined ? limitPageDefault : payload.limitPage;
    const includeDeps = payload.includeDeps === undefined ? includeDepsDefault : payload.includeDeps;

    const response = {
        "items": _articles.sort((a, b) => {
            switch (sortField) {
                case "id": {
                    if (a.id > b.id) return sortOrder === "asc" ? 1 : -1;
                    if (a.id === b.id) return 0;
                    if (a.id < b.id) return sortOrder === "asc" ? -1 : 1;
                }
                case "title": {
                    if (a.title > b.title) return sortOrder === "asc" ? 1 : -1;
                    if (a.title === b.title) return 0;
                    if (a.title < b.title) return sortOrder === "asc" ? -1 : 1;
                }
                case "text": {
                    if (a.text > b.text) return sortOrder === "asc" ? 1 : -1;
                    if (a.text === b.text) return 0;
                    if (a.text < b.text) return sortOrder === "asc" ? -1 : 1;
                }
                case "data": {
                    if (a.data > b.data) return sortOrder === "asc" ? 1 : -1;
                    if (a.data === b.data) return 0;
                    if (a.data < b.data) return sortOrder === "asc" ? -1 : 1;
                }
                case "author": {
                    if (a.author > b.author) return sortOrder === "asc" ? 1 : -1;
                    if (a.author === b.author) return 0;
                    if (a.author < b.author) return sortOrder === "asc" ? -1 : 1;
                }
            }
        }).slice((page - 1) * limitPage, (page - 1) * limitPage + limitPage).filter((articles) => {
            if (includeDeps) return articles.comments.length > 0; // else true
            if (!includeDeps) return articles.comments.length === 0;
        }),
        "meta": {
            "page": page,
            "pages": Math.round(_articles.length / limitPage),
            "count": _articles.length,
            "limit": limitPage
        }
    };
  cb(null, response);
};

articles.read = function (req, res, payload, cb) {
    const idx = _articles.findIndex(article => article.id === payload.id)
    if (idx !== -1) {
        cb(null, _articles[idx])
    } else {
        cb({code: 405, message: 'Article not found'});
    }
};

articles.delete = function (req, res, payload, cb) {
    const idx = _articles.findIndex(article => article.id === payload.id)
    if (idx !== -1) {
        _articles.splice(idx, 1);
        cb(null, _articles);
        extras.saveArticles(_articles);
    } else {
        cb({code: 405, message: 'Article not found'});
    }
};

articles.update = function (req, res, payload, cb) {
   if (validation.isArticleValid(payload)) {
       const idx = _articles.findIndex(article => article.id === payload.id)
       if (idx !== -1) {
           _articles[idx] = payload;
           cb(null, payload);
           extras.saveArticles(_articles);
       } else {
           cb({code: 405, message: 'Article not found'});
       }
   } else {
       cb({code: 400, message: 'Request invalid'});
   }
};

articles.create = function (req, res, payload, cb) {
    if (validation.isArticleValid(payload)) {
        payload.id = extras.generateId();
        _articles.push(payload);
        cb(null, payload);
        extras.saveArticles(_articles);
    } else {
        cb({code: 400, message: 'Request invalid'});
    }

};