"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Player_1 = require("../player/Player");
var Game = /** @class */ (function () {
    function Game(roomName, player) {
        this.name = roomName;
        this.players = [];
        this.rules = [];
        this.players.push(player);
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
    Game.prototype.getGM = function () {
        for (var i = 0; i < this.players.length; i++) {
            if (this.players[i].gameMaster == 1)
                return this.players[i].name;
        }
        return null;
    };
    return Game;
}());
exports.Game = Game;
function joinGame(roomName, playerName, playerSocket, games_array) {
    if (games_array.length == 0)
        games_array[0] = new Game(roomName, new Player_1.Player(playerName, playerSocket, [], 1));
    else {
        for (var i = 0; i < games_array.length; i++) {
            if (games_array[i].name == roomName) {
                games_array[i].addPlayer(new Player_1.Player(playerName, playerSocket, [], 0));
                return games_array;
            }
        }
        games_array.push(new Game(roomName, new Player_1.Player(playerName, playerSocket, [], 1)));
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
function getSearchResult(rooms_array) {
    if (rooms_array.length == 0)
        return null;
    var search_result = [];
    for (var i = 0; i < rooms_array.length; i++) {
        search_result.push({
            "roomName": rooms_array[i].name,
            "players": rooms_array[i].players.length,
            "gameMaster": rooms_array[i].getGM()
        });
    }
    return search_result;
}
exports.getSearchResult = getSearchResult;
