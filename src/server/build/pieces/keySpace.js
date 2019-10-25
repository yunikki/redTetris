"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var okForFall_1 = require("./okForFall");
var creatSpectre_1 = require("./creatSpectre");
var classPieces_1 = require("./classPieces");
var setNewPiece_1 = require("./setNewPiece");
function floorPiece(room, id) {
    var players = undefined;
    clearInterval(room.stop);
    for (var i in room.players) {
        if (room.players[i].loose)
            continue;
        if (room.players[i].socketID == id) {
            while (okForFall_1.okForFall(room.players[i].grid, room)) {
                var x_1 = room.rules[1] ? 11 : 19;
                while (x_1 >= 0) {
                    var y = room.rules[1] ? 7 : 9;
                    while (y >= 0) {
                        if (room.players[i].grid[x_1 + 1] && room.players[i].grid[x_1][y][0] == "P") {
                            room.players[i].grid[x_1 + 1][y] = room.players[i].grid[x_1][y];
                            room.players[i].grid[x_1][y] = ".";
                        }
                        y -= 1;
                    }
                    x_1 -= 1;
                }
            }
            room.players[i].hit = false;
            var x = room.rules[1] ? 11 : 19;
            while (x >= 0) {
                var y = room.rules[1] ? 7 : 9;
                while (y >= 0) {
                    if (room.players[i].grid[x][y][0] == "P") {
                        room.players[i].grid[x][y] = room.players[i].grid[x][y].substring(1, 2);
                    }
                    y -= 1;
                }
                x -= 1;
            }
            room.players[i].currentPiece += 1;
            if (room.Pieces[room.players[i].currentPiece + 1] && room.Pieces[room.players[i].currentPiece]) {
                var new_pices = room.Pieces[room.players[i].currentPiece].piece;
                room = setNewPiece_1.setNewPieceInGrid(room, i, new_pices);
                room = creatSpectre_1.creatSpeactre(room);
            }
            else if (room.Pieces[room.players[i].currentPiece]) {
                room.Pieces.push(new classPieces_1.pieces());
                var new_pices = room.Pieces[room.players[i].currentPiece].piece;
                room = setNewPiece_1.setNewPieceInGrid(room, i, new_pices);
                room = creatSpectre_1.creatSpeactre(room);
            }
            break;
        }
    }
    room = creatSpectre_1.creatSpeactre(room);
    return (room);
}
exports.floorPiece = floorPiece;
