var mongoose = require('mongoose');
var LogSchema = require('./db_logSchema');
var EmailSenderSchema = require('./db_emailSenderSchema');
var EmailReceiversSchema = require('./db_emailReceiversSchema');

var dataBase = {
    init: function () {
        this.db = mongoose.connection;

        this.db.on('error', console.error.bind(console, 'connection error:'));
        this.db.once('open', console.log.bind(console, 'connected to db'));

        mongoose.connect('mongodb://127.0.0.1/test');
    },
    resetData: function () {
        return new Promise(function (resetDataResolve) {
            LogSchema.remove({}, function () {
                console.log('Logs deleted');
            });

            Promise.all([
                    dataBase.setEmailSender('js.logger.service@gmail.com'),
                    dataBase.setEmailReceivers([
                        'misterhomer1992@gmail.com',
                        //'oli4ka271994@gmail.com'
                    ])
                ])
                .then(function () {
                    console.log('update email sender and receivers.');
                    resetDataResolve();
                });
        });
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
            var logSchema;

            logSchema = new LogSchema(logObj);

            logSchema.save(function (err) {
                if (err) {
                    reject(err);
                }

                resolve();
            });
        });
    },
    getEmailSender: function () {
        return new Promise(function (resolve, reject) {
            EmailSenderSchema.find(function (err, logs) {
                if (err) {
                    reject(err);
                }

                resolve(logs);
            });
        });
    },
    setEmailSender: function (email) {
        return new Promise(function (resolve, reject) {
            var emptySenderPromise = new Promise(function (emptySenderPromiseResolve) {
                EmailSenderSchema.remove({}, emptySenderPromiseResolve);
            });

            emptySenderPromise.then(result => {
                var emailSenderSchema = new EmailSenderSchema();

                emailSenderSchema.email = email;
                emailSenderSchema.save(function (err) {
                    if (err) {
                        resolve(err);
                    }

                    resolve();
                });
            });
        });
    },
    getEmailReceivers: function () {
        return new Promise(function (resolve, reject) {
            EmailReceiversSchema.find(function (err, logs) {
                if (err) {
                    reject(err);
                }

                resolve(logs);
            });
        });
    },
    setEmailReceivers: function (emails) {
        return new Promise(function (resolve, reject) {
            var emptySenderPromise = new Promise(function (emptySenderPromiseResolve) {
                EmailReceiversSchema.remove({}, emptySenderPromiseResolve);
            });

            emptySenderPromise.then(result => {
                var emailReceiversSchema = new EmailReceiversSchema();

                emailReceiversSchema.emails = emails;
                emailReceiversSchema.save(function (err) {
                    if (err) {
                        reject(err);
                    }

                    resolve();
                });
            });
        });
    }
};

dataBase.init();

module.exports = dataBase;