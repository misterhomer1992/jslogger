var mongoose = require('mongoose');
var LogSchema = require('./models/log');
var LogParser = require('./_logParser');

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
                    resolve(err);
                }

                resolve();
            });
        });
    }
};

module.exports = dataBase;