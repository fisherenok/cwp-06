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
    let result = {
        "time" : time,
        "url" : url,
        "body" : body
    };
    fs.appendFile(logFileName,
        fs.existsSync(logFileName) ? "," + JSON.stringify(result, null, "\t") : "[" + JSON.stringify(result, null, "\t"),
        (err) => {
            if (err) {
                console.error(err);
            }
            else {
                console.log("log updated");
            }
        });
};

extras.sendLog = function (req, res, payload, cb) {
    cb(null, JSON.parse(fs.readFileSync(logFileName, "utf-8", err => {
        if (err) console.error('Ошибка чтения файл')
    }) + "]"));
};