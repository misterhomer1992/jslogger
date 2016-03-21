var mongoose = require('mongoose');
var Log = require('./models/log');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.on('open', console.log.bind(console, 'connected to db'));

var log = new Log({ name: 'something heppend in IE 10' });

//log.save(function (err) {
//    if (err) {
//        console.log(err);
//    } else {
//        console.log('saved');
//    }
//});

Log.find(function(err, log) {
    if(err) {
        console.log(err);
    }

    console.log(log);
});

mongoose.connect('mongodb://127.0.0.1/test');