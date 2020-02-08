let _articles = require('./articles.json');
const extras = require('./extras');
const validation = require('./validations')
const articles = exports;

articles.readAll = function (req, res, payload, cb) {
  cb(null, _articles);
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