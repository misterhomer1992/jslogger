var LogParser = function(logObject) {
    this._message = logObject.message;
    this._url = logObject.url;
    this._line = logObject.line;
    this._row = logObject.row;
    this._stack = logObject.stack;
    this._userAgent = logObject.userAgent;
    this._date = logObject.date;
};

LogParser.prototype = {
    getUserAgent: function() {
        return this._userAgent;
    }
};

module.exports = LogParser;