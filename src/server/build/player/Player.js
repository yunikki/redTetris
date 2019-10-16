"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Player = /** @class */ (function () {
    function Player(playerName, playerSocketID, grid, gameMaster) {
        this.name = playerName;
        this.socketID = playerSocketID;
        this.grid = grid;
        this.gameMaster = gameMaster;
    }
    return Player;
}());
exports.Player = Player;
