"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var debug_1 = __importDefault(require("debug"));
var classPieces_1 = require("./pieces/classPieces");
var Game_1 = require("./game/Game");
var Game_2 = require("./game/Game");
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
function emit_to_room(room, io) {
    if (room)
        for (var i in room.players) {
            io.to(room.players[i].socketID).emit('action', { type: 'joinRoom', room: room, master: room.players[i].gameMaster });
        }
}
var initEngine = function (io) {
    io.on('connection', function (socket) {
        console.log("Socket connected: " + socket.id);
        socket.on('action', function (action) {
            console.log(action.type);
            if (action.type === 'server/piecesSolo') {
                socket.emit('action', { type: 'newPiece', piece: classPieces_1.getPieces() });
            }
            if (action.type === 'server/creatRoom') {
                rooms_array = Game_2.joinGame(action.roomName, action.playerName, action.socketID, rooms_array, action.priv);
                var room = Game_2.getGame(action.playerName, rooms_array);
                socket.emit('action', { type: 'joinRoom', room: room, master: 2 });
                socket.broadcast.emit('action', { type: 'joinRoom', room: room, master: 2 });
                socket.emit('action', { type: 'searchResult', results: Game_1.getSearchResult(rooms_array) });
                socket.broadcast.emit('action', { type: 'searchResult', results: Game_1.getSearchResult(rooms_array) });
            }
            if (action.type == 'server/searchRoom') {
                socket.emit('action', { type: 'searchResult', results: Game_1.getSearchResult(rooms_array) });
            }
            if (action.type == 'server/removePlayerFromRoom') {
                var room = Game_2.getGame(action.playerName, rooms_array);
                var removedPlayer = Game_2.removePlayer(action.playerName, "", rooms_array);
                socket.emit('action', { type: 'joinRoom', room: undefined, master: false });
                if (room)
                    emit_to_room(room, io);
                socket.emit('action', { type: 'searchResult', results: Game_1.getSearchResult(rooms_array) });
                socket.broadcast.emit('action', { type: 'searchResult', results: Game_1.getSearchResult(rooms_array) });
            }
            if (action.type == 'server/changeParamRoom') {
                Game_2.GameChangeParam(action.val, action.id, action.name, rooms_array);
                var room = Game_2.getGameWithNameRoom(action.name, rooms_array);
                if (room)
                    emit_to_room(room, io);
            }
            if (action.type == 'server/keyDown') {
                var room_1 = Game_2.getGame(action.name, rooms_array);
                room_1 = classPieces_1.featherDrop(room_1, socket.id);
                for (var i in room_1.players) {
                    io.to(room_1.players[i].socketID).emit('action', { type: 'GAME_START', room: room_1, grid: room_1.players[i].grid, next: room_1.Pieces[room_1.players[i].currentPiece + 1].piece });
                }
                room_1.stop = setInterval(function () {
                    room_1 = classPieces_1.fall_piece(room_1);
                    Game_2.updateRoomArray(room_1, rooms_array);
                    for (var i in room_1.players) {
                        io.to(room_1.players[i].socketID).emit('action', { type: 'GAME_START', room: room_1, grid: room_1.players[i].grid, next: room_1.Pieces[room_1.players[i].currentPiece + 1].piece });
                    }
                }, 500);
                Game_2.updateRoomArray(room_1, rooms_array);
            }
            if (action.type == 'server/keySpace') {
                var room_2 = Game_2.getGame(action.name, rooms_array);
                room_2 = classPieces_1.floorPiece(room_2, socket.id);
                for (var i in room_2.players) {
                    io.to(room_2.players[i].socketID).emit('action', { type: 'GAME_START', room: room_2, grid: room_2.players[i].grid, next: room_2.Pieces[room_2.players[i].currentPiece + 1].piece });
                }
                room_2.stop = setInterval(function () {
                    room_2 = classPieces_1.fall_piece(room_2);
                    Game_2.updateRoomArray(room_2, rooms_array);
                    for (var i in room_2.players) {
                        io.to(room_2.players[i].socketID).emit('action', { type: 'GAME_START', room: room_2, grid: room_2.players[i].grid, next: room_2.Pieces[room_2.players[i].currentPiece + 1].piece });
                    }
                }, 500);
                Game_2.updateRoomArray(room_2, rooms_array);
            }
            if (action.type == 'server/gameStart') {
                var room_3 = Game_2.getGame(action.playerName, rooms_array);
                var socketRoom_1 = Game_2.getGameWithNameRoom(room_3.name, rooms_array);
                var new_room = [];
                room_3.Pieces.push(new classPieces_1.pieces());
                room_3.Pieces.push(new classPieces_1.pieces());
                if (!room_3)
                    return (undefined);
                socketRoom_1 = classPieces_1.setNewPieceInGridForAll(room_3);
                if (room_3) {
                    for (var i in socketRoom_1.players) {
                        io.to(socketRoom_1.players[i].socketID).emit('action', { type: 'GAME_START', room: room_3, grid: socketRoom_1.players[i].grid, next: socketRoom_1.Pieces[socketRoom_1.players[i].currentPiece + 1].piece });
                        //n'emit rien
                    }
                }
                socketRoom_1.status = "runing";
                socketRoom_1.stop = setInterval(function () {
                    socketRoom_1 = classPieces_1.fall_piece(socketRoom_1);
                    Game_2.updateRoomArray(socketRoom_1, rooms_array);
                    for (var i in socketRoom_1.players) {
                        io.to(socketRoom_1.players[i].socketID).emit('action', { type: 'GAME_START', room: room_3, grid: socketRoom_1.players[i].grid, next: socketRoom_1.Pieces[socketRoom_1.players[i].currentPiece + 1].piece });
                    }
                }, 500);
                Game_2.updateRoomArray(socketRoom_1, rooms_array);
            }
        });
        socket.on('disconnect', function () {
            var room = Game_2.getGameWithId(socket.id, rooms_array);
            var player = Game_2.removePlayer("", socket.id, rooms_array);
            console.log(room, player);
            if (room)
                emit_to_room(room, io);
            socket.broadcast.emit('action', { type: 'searchResult', results: Game_1.getSearchResult(rooms_array) });
            if (player == null)
                console.log("Unknown User Disconnected");
            else
                console.log("User disconnected : ", player);
            console.log(rooms_array);
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
