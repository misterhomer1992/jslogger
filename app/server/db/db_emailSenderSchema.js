var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var EmailSenderSchema = new Schema({
    email: String
});

module.exports = mongoose.model('emailsender', EmailSenderSchema);