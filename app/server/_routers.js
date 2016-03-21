var express = require('express');
var router = express.Router();
var dataBase = require('./db/db');

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
                result => res.json({success: 1, logs: result}),
                error => res.json({success: 0, message: error})
            );
    });

router.route('/emailSender')
    .post(function(req, res) {
        dataBase.setEmailSender(req.body.email)
            .then(
                result => res.json({success: 1, message: 'email updated'}),
                error => res.json({success: 0, message: error})
            );
    })
    .get(function(req, res) {
        dataBase.getEmailSender()
            .then(
                result => res.json({success: 1, email: result[0].email}),
                error => res.json({success: 0, message: error})
            );
    });

router.route('/emailReceivers')
    .post(function(req, res) {
        var mailArray = JSON.parse(req.body.mails);
        dataBase.setEmailReceivers(mailArray)
            .then(
                result => res.json({success: 1, message: 'emails updated'}),
                error => res.json({success: 0, message: error})
            );
    })
    .get(function(req, res) {
        dataBase.getEmailReceivers()
            .then(
                result => res.json({success: 1, emails: result}),
                error => res.json({success: 0, message: error})
            );
    });


module.exports = router;
