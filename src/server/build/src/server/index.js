"use strict";
var fs = require('fs');
var debug = require('debug');
var logerror = debug('tetris:error'), loginfo = debug('tetris:info');
var initApp = function (app, params, cb) {
    var host = params.host, port = params.port;
    var handler = function (req, res) {
        var file = req.url === '/bundle.js' ? '/../../build/bundle.js' : '/../../index.html';
        fs.readFile(__dirname + file, function (err, data) {
            if (err) {
                logerror(err);
                res.writeHead(500);
                return res.end('Error loading index.html');
            }
            res.writeHead(200);
            res.end(data);
        });
    };
    app.on('request', handler);
    app.listen({ host: host, port: port }, function () {
        loginfo("tetris listen on " + params.url);
        cb();
    });
};
var initEngine = function (io) {
    io.on('connection', function (socket) {
        loginfo("Socket connected: " + socket.id);
        socket.on('action', function (action) {
            if (action.type === 'server/ping') {
                socket.emit('action', { type: 'pong' });
            }
        });
    });
};
function create(params) {
    var promise = new Promise(function (resolve, reject) {
        var app = require('http').createServer();
        initApp(app, params, function () {
            var io = require('socket.io')(app);
            var stop = function (cb) {
                io.close();
                app.close(function () {
                    app.unref();
                });
                loginfo("Engine stopped.");
                cb();
            };
            initEngine(io);
            resolve({ stop: stop });
        });
    });
    return promise;
}
module.exports = create;
