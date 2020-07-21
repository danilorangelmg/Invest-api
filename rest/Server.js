let express = require('express');
let bodyParser = require('body-parser');

let app = module.exports = express();

let allowCors = function (req, res, next) {
    res.header('Acess-Control-Allow-Origin', '127.0.0.1:5000');
    res.header('Acess-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Acess-Control-Allow-Headers', 'Content-Type');
    res.header('Acess-Control-Allow-Credentials', 'true');

    next();
}

app.listen(5000);
console.log("running node server on localhost port:5000");

app.use(allowCors);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

