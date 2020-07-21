let db_string = 'localhost:27017/data/db/TCC' //todo criar banco
exports.mongoDb = require('mongoose').connect(db_string)
console.log("connected mongodb on localhost:27017")
