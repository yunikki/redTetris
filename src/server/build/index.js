"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var debug_1 = __importDefault(require("debug"));
var logerror = debug_1.default('tetris:error'), loginfo = debug_1.default('tetris:info');
var initApp = function (app, params, cb) {
    var host = params.host, port = params.port;
    var handler = function (req, res) {
        var file = req.url === '/bundle.js' ? '/../../build/bundle.js' : '/../../index.html';
        fs_1.default.readFile(__dirname + file, function (err, data) {
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
                console.log("test");
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
exports.create = create;
