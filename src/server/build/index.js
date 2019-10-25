"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var debug_1 = __importDefault(require("debug"));
var classPieces_1 = require("./pieces/classPieces");
var keySpace_1 = require("./pieces/keySpace");
var setNewPiece_1 = require("./pieces/setNewPiece");
var fallPiece_1 = require("./pieces/fallPiece");
var Game_1 = require("./game/Game");
var keyDown_1 = require("./pieces/keyDown");
var keyRigth_1 = require("./pieces/keyRigth");
var keyLeft_1 = require("./pieces/keyLeft");
var resetParty_1 = require("./pieces/resetParty");
var Game_2 = require("./game/Game");
var keyUp_1 = require("./pieces/keyUp");
var lib_1 = require("./pieces/lib");
var logerror = debug_1.default('tetris:error'), loginfo = debug_1.default('tetris:info');
var initApp = function (app, params, cb) {
    var host = params.host, port = params.port;
    var handler = function (req, res) {
        var file = req.url === '/bundle.js' ? '/../../build/bundle.js' : '/../../../index.html';
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
        console.log("tetris listen on " + params.url);
        cb();
    });
};
var rooms_array = [];
var initEngine = function (io) {
    io.on('connection', function (socket) {
        function key(f, action) {
            var room = Game_2.getGame(action.name, rooms_array);
            if (!room)
                return (false);
            room = f(room, socket.id);
            Game_2.updateRoomArray(room, rooms_array);
            io.sockets.in(room.name).emit('action', { type: 'GAME_START', room: room });
            socket.broadcast.emit('action', { type: 'searchResult', results: Game_1.getSearchResult(rooms_array) });
            if (lib_1.isEndGame(room)) {
                room = lib_1.resetRoomSpec(room);
                io.sockets.in(room.name).emit('action', { type: 'END_GAME', room: room });
            }
        }
        console.log("Socket connected: " + socket.id);
        socket.on('action', function (action) {
            console.log(action.type);
            if (action.type === 'server/creatRoom') {
                rooms_array = Game_2.joinGame(action.roomName, action.playerName, action.socketID, rooms_array, action.priv);
                var room = Game_2.getGame(action.playerName, rooms_array);
                if (!room)
                    return (false);
                socket.join(room.name);
                socket.emit('action', { type: 'joinRoom', room: room, master: 2 });
                socket.broadcast.emit('action', { type: 'joinRoom_', room: room, master: 2 });
                socket.emit('action', { type: 'searchResult', results: Game_1.getSearchResult(rooms_array) });
                socket.broadcast.emit('action', { type: 'searchResult', results: Game_1.getSearchResult(rooms_array) });
            }
            else if (action.type == 'server/searchRoom') {
                socket.emit('action', { type: 'searchResult', results: Game_1.getSearchResult(rooms_array) });
            }
            else if (action.type == 'server/removePlayerFromRoom') {
                var room = Game_2.getGame(action.playerName, rooms_array);
                Game_2.removePlayer(action.playerName, "", rooms_array);
                if (!room)
                    return (false);
                socket.leave(room.name);
                socket.emit('action', { type: 'joinRoom', room: undefined, master: false });
                lib_1.updateRoomFoorAll(room, io);
                if (lib_1.isEndGame(room)) {
                    room = lib_1.resetRoomSpec(room);
                    io.sockets.in(room.name).emit('action', { type: 'END_GAME', room: room });
                }
                socket.emit('action', { type: 'searchResult', results: Game_1.getSearchResult(rooms_array) });
                socket.broadcast.emit('action', { type: 'searchResult', results: Game_1.getSearchResult(rooms_array) });
            }
            else if (action.type == 'server/changeParamRoom') {
                Game_2.GameChangeParam(action.val, action.id, action.name, rooms_array);
                var room = Game_2.getGameWithNameRoom(action.name, rooms_array);
                if (room)
                    lib_1.updateRoomFoorAll(room, io);
            }
            else if (action.type == 'server/gameStart') {
                var room = Game_2.getGame(action.playerName, rooms_array);
                if (!room)
                    return (false);
                var socketRoom = Game_2.getGameWithNameRoom(room.name, rooms_array);
                var new_room = [];
                socketRoom.Pieces.push(new classPieces_1.pieces());
                socketRoom.Pieces.push(new classPieces_1.pieces());
                if (!socketRoom)
                    return (undefined);
                socketRoom = resetParty_1.resetParty(socketRoom);
                socketRoom = setNewPiece_1.setNewPieceInGridForAll(socketRoom);
                socketRoom.status = "runing";
                Game_2.updateRoomArray(socketRoom, rooms_array);
                io.sockets.in(room.name).emit('action', { type: 'GAME_START_', room: socketRoom });
                socket.broadcast.emit('action', { type: 'searchResult', results: Game_1.getSearchResult(rooms_array) });
            }
            else if (action.type == 'server/keyDown') {
                key(keyDown_1.featherDrop, action);
            }
            else if (action.type == 'server/keySpace') {
                key(keySpace_1.floorPiece, action);
            }
            else if (action.type == 'server/keyleft') {
                key(keyLeft_1.moveLeft, action);
            }
            else if (action.type == 'server/keyRight') {
                key(keyRigth_1.moveRight, action);
            }
            else if (action.type == 'server/boucle') {
                key(fallPiece_1.fall_piece, action);
            }
            else if (action.type == "server/keyUp") {
                key(keyUp_1.keyUp, action);
            }
        });
        socket.on('disconnect', function () {
            var room = Game_2.getGameWithId(socket.id, rooms_array);
            var player = Game_2.removePlayer("", socket.id, rooms_array);
            if (room && lib_1.isEndGame(room)) {
                room = lib_1.resetRoomSpec(room);
                io.sockets.in(room.name).emit('action', { type: 'END_GAME', room: room });
            }
            if (room) {
                socket.leave(room.name);
                lib_1.updateRoomFoorAll(room, io);
            }
            socket.broadcast.emit('action', { type: 'searchResult', results: Game_1.getSearchResult(rooms_array) });
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
                console.log("Engine stopped.");
                cb();
            };
            initEngine(io);
            resolve({ stop: stop });
        });
    });
    return promise;
}
exports.create = create;
