const validation = exports;

validation.isArticleValid = function (req) {
    return req.title !== undefined && req.text !== undefined && req.date !== undefined
        && req.author !== undefined && req.areCommentsValid(req.comments)
};

validation.areCommentsValid = function (comments) {
    comments.forEach((el) => {
        if (!validation.isCommentValid(el)) {
            return false
        }
    });
    return true
};

validation.isCommentValid = function (req) {
    return Number.isInteger(req.articleId) && req.text !== undefined
        && req.date !== undefined && req.author !== undefined
};