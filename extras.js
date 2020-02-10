const fs = require('fs');
const extras = exports;

let seed = 0;
let logFileName = "logs/" + new Date().toISOString().slice(0,10).replace(/-/g,"");

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
    fs.appendFile(logFileName,
        time + " :\n" + "\turl : " + url + "\n\tbody : " + body + "\n", err => {
            if (err) {
                console.error(err)
            } else {
                console.log('Log updated')
            }
        })
}