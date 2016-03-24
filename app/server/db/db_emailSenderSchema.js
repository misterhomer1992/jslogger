var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EmailSenderSchema = new Schema(
    {
        email: String
    },
    {
        versionKey: false
    }
);

module.exports = mongoose.model('emailsender', EmailSenderSchema);