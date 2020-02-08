const fs = require('fs');
const extras = exports;

let seed = 0;

extras.generateId = function () {
    return Date.now() + seed++;
};

extras.saveArticles = function (data) {
    console.log(data);
    fs.writeFile('articles.json', JSON.stringify(data), "utf-8", err => {
        if (err) {
            console.error(err)
        } else {
            console.log('Articles updated')
        }
    })
};

extras.logReq = function (url, body, time) {
    fs.appendFile('logs/' + Date.now().toISOString().slice(0,10),replace(/-/g, ''),
        time + " :\n" + "\turl : " + url + "\n\tbody : " + body + "\n", err => {
            if (err) {
                console.error(err)
            } else {
                console.log('Log updated')
            }
        })
}