var mongoose = require('mongoose');
var LogSchema = require('./db_logSchema');
var EmailSenderSchema = require('./db_emailSenderSchema');
var LogParser = require('./../utils/_logParser');
var EmailReceiversSchema = require('./db_emailReceiversSchema');

var dataBase = {
    init: function () {
        this.db = mongoose.connection;

        this.db.on('error', console.error.bind(console, 'connection error:'));
        this.db.once('open', console.log.bind(console, 'connected to db'));

        mongoose.connect('mongodb://127.0.0.1/test');
    },
    getLogs: function () {
        return new Promise(function (resolve, reject) {
            LogSchema.find(function (err, logs) {
                if (err) {
                    reject(err);
                }

                resolve(logs);
            });
        });
    },
    saveLog: function (logObj) {
        return new Promise(function (resolve, reject) {
            var logParser,
                logSchema;

            logParser = new LogParser(logObj);
            logSchema = new LogSchema(logParser.getLog());

            logSchema.save(function (err) {
                if (err) {
                    reject(err);
                }

                resolve();
            });
        });
    },
    getEmailSender: function() {
        return new Promise(function (resolve, reject) {
            EmailSenderSchema.find(function (err, logs) {
                if (err) {
                    reject(err);
                }

                resolve(logs);
            });
        });
    },
    setEmailSender: function(email) {
        return new Promise(function (resolve, reject) {
            var emptySenderPromise = new Promise(function(emptySenderPromiseResolve) {
                EmailSenderSchema.remove({}, emptySenderPromiseResolve);
            });

            emptySenderPromise.then(result => {
                var emailSenderSchema = new EmailSenderSchema();

                emailSenderSchema.email = email;
                emailSenderSchema.save(function(err) {
                    if (err) {
                        resolve(err);
                    }

                    resolve();
                });
            });
        });
    },
    getEmailReceivers: function() {
        return new Promise(function (resolve, reject) {
            EmailReceiversSchema.find(function (err, logs) {
                if (err) {
                    reject(err);
                }

                resolve(logs);
            });
        });
    },
    setEmailReceivers: function(emails) {
        return new Promise(function (resolve, reject) {
            var emptySenderPromise = new Promise(function(emptySenderPromiseResolve) {
                EmailReceiversSchema.remove({}, emptySenderPromiseResolve);
            });

            emptySenderPromise.then(result => {
                var emailReceiversSchema = new EmailReceiversSchema();

                emailReceiversSchema.emails = emails;
                emailReceiversSchema.save(function(err) {
                    if (err) {
                        reject(err);
                    }

                    resolve();
                });
            });
        });
    }
};

module.exports = dataBase;