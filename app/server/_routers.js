var express = require('express');
var router = express.Router();
var dataBase = require('./_db');

dataBase.init();

router.use(function (req, res, next) {
    console.log('Request on ' + req.url);
    next();
});


router.get('/', function (req, res) {
    res.json({message: 'API working fine!'});
});

router.route('/logs')
    .post(function (req, res) {
        dataBase.saveLog(req.body)
            .then(
                result => res.json({success: 1, message: 'Log added'}),
                error => res.json({success: 0, message: error})
            );
    })
    .get(function (req, res) {
        dataBase.getLogs()
            .then(
                result => res.json({success: 1, message: result}),
                error => res.json({success: 0, message: error})
            );
    });

module.exports = router;
