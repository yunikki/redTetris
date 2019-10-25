"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var okForFall_1 = require("./okForFall");
var creatSpectre_1 = require("./creatSpectre");
var classPieces_1 = require("./classPieces");
var setNewPiece_1 = require("./setNewPiece");
function fall_piece(room, id) {
    var i = 0;
    for (i in room.players) {
        if (room.players[i].socketID == id) {
            if (room.players[i].loose)
                return (room);
            if (okForFall_1.okForFall(room.players[i].grid, room)) {
                room.players[i].hit = false;
                var x = room.rules[1] ? 11 : 19;
                while (x >= 0) {
                    var y = room.rules[1] ? 7 : 9;
                    while (y >= 0) {
                        if (room.players[i].grid[x + 1] && room.players[i].grid[x][y][0] == "P") {
                            room.players[i].grid[x + 1][y] = room.players[i].grid[x][y];
                            room.players[i].grid[x][y] = ".";
                        }
                        y -= 1;
                    }
                    x -= 1;
                }
            }
            else if (room.players[i].hit == false) {
                room.players[i].hit = true;
            }
            else {
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
                if (room.Pieces[room.players[i].currentPiece + 1]) {
                    var new_pices = room.Pieces[room.players[i].currentPiece].piece;
                    room = setNewPiece_1.setNewPieceInGrid(room, i, new_pices);
                    room = creatSpectre_1.creatSpeactre(room);
                }
                else {
                    room.Pieces.push(new classPieces_1.pieces());
                    var new_pices = room.Pieces[room.players[i].currentPiece].piece;
                    room = setNewPiece_1.setNewPieceInGrid(room, i, new_pices);
                    room = creatSpectre_1.creatSpeactre(room);
                }
            }
        }
    }
    room = creatSpectre_1.creatSpeactre(room);
    return (room);
}
exports.fall_piece = fall_piece;
