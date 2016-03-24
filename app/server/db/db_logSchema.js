var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LogSchema = new Schema(
    {
        message: {type: String, default: ''},
        stack: {type: String, default: ''},
        browserName: {type: String, default: ''},
        browserVersion: {type: String, default: ''},
        url: {type: String, default: ''},
        line: {type: Number, default: 0},
        row: {type: Number, default: 0},
        date: {type: Date, default: Date.now}
    }
    ,
    {
        versionKey: false
    }
);

module.exports = mongoose.model('jslogger', LogSchema);