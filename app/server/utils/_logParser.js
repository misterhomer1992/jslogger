var LogParser = function (logObject) {
    this._message = logObject.message;
    this._url = logObject.url;
    this._line = logObject.line;
    this._row = logObject.row;
    this._stack = logObject.stack;
    this._userAgent = logObject.userAgent;
    this._date = logObject.date;

    this._parse();
};

LogParser.prototype = {
    _parse: function () {
        var browserObj;

        browserObj = this._getBrowser();
        this._browserName = browserObj.name;
        this._browserVersion = browserObj.version;
    },
    _getBrowser: function () {
        var ua = this._userAgent, tem,
            M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        if (/trident/i.test(M[1])) {
            tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
            return 'IE ' + (tem[1] || '');
        }
        if (M[1] === 'Chrome') {
            tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
            if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
        }
        M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
        if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
        return {
            name: M[0],
            version: M[1]
        };
    },
    getLog: function () {
        return {
            message: this._message,
            stack: this._stack,
            browserName: this._browserName,
            browserVersion: this._browserVersion,
            userAgent: this._userAgent,
            url: this._url,
            line: this._line,
            row: this._row,
            date: this._date
        };
    }
};

module.exports = LogParser;