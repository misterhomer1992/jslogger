var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var db = mongoose.connection;
var LogSchema = require('./models/log');
var LogParser = require('./logParser');

router.use(function (req, res, next) {
    console.log('Request on ' + req.url);
    next();
});

db.on('error', console.error.bind(console, 'connection error:'));
db.on('open', console.log.bind(console, 'connected to db'));


router.get('/', function (req, res) {
    res.json({message: 'API working fine!'});
});

router.route('/logs')
    .post(function (req, res) {
        var logParser,
            logSchema;

        logParser = new LogParser(req.body);
        logSchema = new LogSchema(logParser.getLog());

        logSchema.save(function (err) {
            if (err) {
                res.json({
                    success: 0,
                    message: err
                });
            }

            res.json({
                success: 1,
                message: 'Log added'
            });
        });
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