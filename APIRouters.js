var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var db = mongoose.connection;
var LogSchema = require('./models/log');
var LogParser = require('./LogParser');

router.use(function (req, res, next) {
    var requestUrl = req.originalUrl + req.url;

    console.log('Request on ' + requestUrl);
    next();
});

db.on('error', console.error.bind(console, 'connection error:'));
db.on('open', console.log.bind(console, 'connected to db'));


router.get('/', function (req, res) {
    res.json({message: 'hooray! welcome to our api!'});
});

router.route('/logs')
    .post(function (req, res) {
        var logParser = new LogParser(req.body)
        var s;
        //
        //newLog.message = req.body.message;
        //newLog.stack = req.body.stack;
        //newLog.browser = req.body.browser;
        //newLog.browserVersion = req.body.browserVersion;
        //newLog.page = req.body.page;
        //newLog.date = req.body.date;
        //newLog.line = req.body.line;
        //newLog.row = req.body.row;

        //newLog.save(function (err) {
        //    if (err) {
        //        res.json({
        //            success: 0,
        //            message: err
        //        });
        //    }
        //
        //    res.json({
        //        success: 1,
        //        message: 'Log added'
        //    });
        //});
    })
    .get(function (req, res) {
        LogSchema.find(function (err, logs) {
            if (err) {
                res.send(err);
            }

            res.json(logs);
        });
    });

mongoose.connect('mongodb://127.0.0.1/test');

module.exports = router;