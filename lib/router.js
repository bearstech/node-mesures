var Router = function(server) {
    this.server = server;
    this.routes = [];
    var that = this;
    server.on('request', function(req, res) {
        var not_found = true;
        for (var i = 0; i < that.routes.length; i++) {
            var line = that.routes[i];
            var pattern = line[0];
            var cb = line[1];
            var m = pattern.exec(req.url);
            if (m !== null) {
                cb(req, res, m);
                not_found = false;
                break;
            }
        }
        if (not_found) {
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('Not found');
        }
    });
};

exports.Router = Router;

/** Add a route */
Router.prototype.route = function(pattern, cb) {
    this.routes.push([pattern, cb]);
};
