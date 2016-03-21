var mongoose = require('mongoose');
var db = mongoose.connection;
var LogSchema = require('./db_logSchema');
var dataBase = require('./db');

db.on('error', console.error.bind(console, 'connection error:'));
db.on('open', console.log.bind(console, 'connected to db'));

mongoose.connect('mongodb://127.0.0.1/test');

LogSchema.remove({}, function() {
    console.log('Logs deleted');
});

Promise.all([
    dataBase.setEmailSender('js.logger.service@gmail.com'),
    dataBase.setEmailReceivers([
        'misterhomer1992@gmail.com'
    ])
])
.then(function() {
   console.log('update email sender and receivers.');
});