/**
 * Created by TooNies1810 on 6/12/16.
 */
var Datastore = require('nedb');

var db = {};
db.user = new Datastore({filename: 'databases/users.db', autoload: true});

module.exports = db;