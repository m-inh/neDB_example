/**
 * Created by TooNies1810 on 6/12/16.
 */

var express = require('express');
var app = express();
var db = require('./db');

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(express.static(__dirname + "/public"));

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/public");
});

app.get('/users', function (req, res) {
    db.user.find({}, function (err, data) {
        res.end(JSON.stringify(data));
    });
});

app.get('/user/:id', function (req, res) {
    db.user.find({"_id": req.params.id}, function (err, data) {
        if (data.length == 0) {
            res.end("Khong ton tai user voi id = " + req.params.id);
        } else {
            res.end(JSON.stringify(data));
        }
    });
});

// var user = {
//     "name": "ok",
//     "id": 1
// };

// app.get('/adduser', function (req, res) {
//     db.user.insert(user, function (err) {
//         if (!err) {
//             console.log("insert ok!");
//         } else {
//             console.log("insert that cmn bai!");
//         }
//     });
// });

app.post('/adduser', function (req, res) {
    var user = req.body;
    db.user.insert(user, function (err) {
        if (!err){
            res.end("insert " + user + " success!");
        }
    });
});

app.listen(3000, function () {
    console.log("server is listening on 3000");
});