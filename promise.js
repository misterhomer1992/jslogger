var promise = new Promise();

setTimeout(function() {
    promise.resolve('test promise');
}, 5000);

promise.then(function(message) {
    console.log(message);
});

console.log('start');