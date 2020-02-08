let _articles = require('./articles.json');
const extras = require('./extras');
const validation = require('./validations')
const comments = exports;

comments.delete = function (req, res, payload, cb) {
    const idxA = _articles.findIndex(article => article.id === payload.articleId);
    if (idxA !== -1) {
        const idxC = _articles[idxA].comments.findIndex(com => com.id === payload.id);
        if (idxC !== -1) {
            _articles[idxA].comments.splice(idxC, 1);
            cb(null, _articles);
            extras.saveArticles(_articles);
        } else {
            cb({code: 406, message: 'Comment not found'});
        }
    } else {
        cb({code: 405, message: 'Article not found'});
    }
};

comments.create = function (req, res, payload, cb) {
    if (validation.isCommentValid(payload)) {
        const idx = _articles.findIndex(article => article.id === payload.articleId);

        if (idx !== -1) {
            payload.id = extras.generateId();
            _articles[idx].comments.push(payload);
            cb(null, _articles[idx].comments[_articles[idx].comments.length - 1]);
            extras.saveArticles(_articles);
        } else {
            cb({code: 405, message: 'Article not found'});
        }
    } else {
        cb({code: 400, message: 'Request invalid'});
    }
};

