var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EmailReceivers = new Schema(
    {
        emails: [String]
    },
    {
        versionKey: false
    }
);

module.exports = mongoose.model('emailreceivers', EmailReceivers);