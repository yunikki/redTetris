"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Player_1 = require("../player/Player");
var Game = /** @class */ (function () {
    function Game(roomName, player, priv) {
        this.name = roomName;
        this.stop = undefined;
        this.priv = priv;
        this.Pieces = [];
        this.players = [];
        this.rules = [
            false,
            true,
            false,
            false //bubbleTiles:
        ];
        this.players.push(player);
        this.status = 'waiting';
    }
    Game.prototype.addPlayer = function (player) {
        this.players.push(player);
    };
    Game.prototype.isPlayerInGame = function (playerName) {
        for (var i = 0; i < this.players.length; i++) {
            if (this.players[i].name == playerName) {
                return 1;
            }
        }
        return null;
    };
    Game.prototype.isSocketInGame = function (playerName) {
        for (var i = 0; i < this.players.length; i++) {
            if (this.players[i].socketID == playerName) {
                return 1;
            }
        }
        return null;
    };
    Game.prototype.getGM = function () {
        for (var i = 0; i < this.players.length; i++) {
            if (this.players[i].gameMaster == 1)
                return this.players[i].name;
        }
        return null;
    };
    Game.prototype.changeParam = function (val, id) {
        this.rules[id] = val;
    };
    Game.prototype.removePlayer = function (playerName, socketID) {
        if (playerName === void 0) { playerName = ""; }
        if (socketID === void 0) { socketID = ""; }
        var player;
        var master = false;
        if (playerName.length == 0) {
            for (var i = 0; i < this.players.length; i++) {
                if (this.players[i].socketID == socketID) {
                    if (this.players[i].gameMaster == 1) {
                        master = true;
                    }
                    player = this.players[i];
                    this.players.shift(i, 1);
                    if (master && this.players.length != 0)
                        this.players[0].gameMaster = 1;
                    return player;
                }
            }
        }
        else {
            for (var j = 0; j < this.players.length; j++) {
                if (this.players[j].name == playerName) {
                    if (this.players[j].gameMaster == 1) {
                        master = true;
                    }
                    player = this.players[j];
                    this.players.shift(j, 1);
                    if (master && this.players.length != 0)
                        this.players[0].gameMaster = 1;
                    return player;
                }
            }
        }
        return null;
    };
    return Game;
}());
exports.Game = Game;
function joinGame(roomName, playerName, playerSocket, games_array, priv) {
    if (games_array.length == 0)
        games_array[0] = new Game(roomName, new Player_1.Player(playerName, playerSocket, [], 1), priv);
    else {
        for (var i = 0; i < games_array.length; i++) {
            if (games_array[i].name == roomName) {
                games_array[i].addPlayer(new Player_1.Player(playerName, playerSocket, [], 0));
                return games_array;
            }
        }
        games_array.push(new Game(roomName, new Player_1.Player(playerName, playerSocket, [], 1), priv));
    }
    return games_array;
}
exports.joinGame = joinGame;
function getGame(playerName, games_array) {
    for (var i = 0; i < games_array.length; i++) {
        if (games_array[i].isPlayerInGame(playerName) != null)
            return games_array[i];
    }
    return null;
}
exports.getGame = getGame;
function isMasterInRoom(playerName, room) {
    for (var i = 0; i < games_array.length; i++) {
        if (games_array[i].isPlayerInGame(playerName) != null)
            return games_array[i];
    }
    return null;
}
exports.isMasterInRoom = isMasterInRoom;
function getGameWithId(socketId, games_array) {
    for (var i = 0; i < games_array.length; i++) {
        if (games_array[i].isSocketInGame(socketId) != null)
            return games_array[i];
    }
    return null;
}
exports.getGameWithId = getGameWithId;
function getSearchResult(rooms_array) {
    if (rooms_array.length == 0)
        return null;
    var search_result = [];
    for (var i = 0; i < rooms_array.length; i++) {
        console.log(rooms_array[i].priv);
        if (rooms_array[i].priv == false)
            search_result.push({
                "roomName": rooms_array[i].name,
                "players": rooms_array[i].players.length,
                "gameMaster": rooms_array[i].getGM()
            });
    }
    return search_result;
}
exports.getSearchResult = getSearchResult;
function removePlayer(playerName, socketID, games_array) {
    if (playerName === void 0) { playerName = ""; }
    if (socketID === void 0) { socketID = ""; }
    var player;
    for (var i = 0; i < games_array.length; i++) {
        player = games_array[i].removePlayer(playerName, socketID);
        if (player == null)
            i++;
        else {
            if (games_array[i].players.length == 0) {
                if (games_array[i].stop)
                    clearInterval(games_array[i].stop);
                games_array.shift(i, 1);
            }
            return player;
        }
    }
    return null;
}
exports.removePlayer = removePlayer;
function getGameWithNameRoom(name, rooms) {
    for (var i in rooms) {
        if (rooms[i].name == name) {
            return (rooms[i]);
        }
    }
}
exports.getGameWithNameRoom = getGameWithNameRoom;
function GameChangeParam(val, id, name, rooms) {
    var room = getGameWithNameRoom(name, rooms);
    room.changeParam(val, id);
}
exports.GameChangeParam = GameChangeParam;
function updateRoomArray(r, rooms) {
    for (var i in rooms) {
        if (rooms[i].name == r.name) {
            rooms[i] = r;
            return (rooms[i]);
        }
    }
}
exports.updateRoomArray = updateRoomArray;
