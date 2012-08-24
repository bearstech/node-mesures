var EventSource = require('eventsource');

function factory(state, opts) {

    var es = new EventSource(opts.url);
    es.onmessage = function(e) {
        var msg = JSON.parse(e.data);
        for (k in msg) {
            state.set(opts.prefix + '.' + k, msg[k]);
        }
    };
    es.onerror = function() {
        console.log('[plugin eventsource] Error');
    };
    console.log('[plugin eventsource] listening a new source.');
}

function register(state, router, opts, cb) {
    factory(state, opts);
    if (cb) cb.call();
}

exports.register = register;
