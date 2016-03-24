var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var routers = require('./routers');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
};

app.use(allowCrossDomain);
app.use('/api', routers);
app.listen(port);

console.log('Start server on 127.0.0.1:' + port);