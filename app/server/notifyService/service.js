var emailService = require('./service_email');

var Notifier = {
    _initServices: function() {
        this.services = [
            emailService
        ];
    },
    notify: function(logObject) {
        var self = this;
        var promises = [];

        return new Promise(function(notifyResolve) {
            self.services.forEach(function(service) {
                promises.push(service.send(logObject));
            });

            Promise
                .all(promises)
                .then(notifyResolve);
        });
    }
};

Notifier._initServices();

module.exports = Notifier;