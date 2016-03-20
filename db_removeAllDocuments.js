var mongoose = require('mongoose');
var Log = require('./models/log');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.on('open', console.log.bind(console, 'connected to db'));

mongoose.connect('mongodb://127.0.0.1/test');

Log.remove({}, function() {
    console.log('All documents deleted');
});