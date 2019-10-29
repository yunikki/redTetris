"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var classPieces_1 = require("../pieces/classPieces");
var setNewPiece_1 = require("./setNewPiece");
var creatSpectre_1 = require("./creatSpectre");
var keyUp_1 = require("./keyUp");
function falling_piece(room, i) {
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
    return (room);
}
exports.falling_piece = falling_piece;
function end_fall(room, i) {
    console.log("END FALL");
    room.players[i].hit = false;
    var x = room.rules[1] ? 11 : 19;
    while (x >= 0) {
        var y = room.rules[1] ? 7 : 9;
        while (y >= 0) {
            if (room.players[i].grid[x][y][0] == "P")
                room.players[i].grid[x][y] = room.players[i].grid[x][y].substring(1, 2);
            y -= 1;
        }
        x -= 1;
    }
    room.players[i].currentPiece += 1;
    if (room.Pieces[room.players[i].currentPiece] && room.Pieces[room.players[i].currentPiece + 1]) {
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
    keyUp_1.clearRotatingPiece(room.players[i].socketID);
    return (room);
}
exports.end_fall = end_fall;
function okForFall(grid, room) {
    if (!grid)
        return (false);
    var x = room.rules[1] ? 11 : 19;
    var ret = true;
    var c = 0;
    while (x >= 0) {
        var y = room.rules[1] ? 7 : 9;
        while (y >= 0) {
            if (grid[x][y][0] == "P")
                c += 1;
            if (grid[x][y][0] == "P" && (grid[x + 1] == undefined || (grid[x + 1][y] != "." && grid[x + 1][y] != "S" && grid[x + 1][y][0] != "P")))
                return false;
            y -= 1;
        }
        x -= 1;
    }
    if (c != 4)
        return false;
    return ret;
}
exports.okForFall = okForFall;
function okForMoveLateral(grid, room, nb) {
    var x = room.rules[1] ? 11 : 19;
    var ret = true;
    while (x >= 0) {
        var y = room.rules[1] ? 7 : 9;
        while (y >= 0) {
            if (nb < 0 && grid[x][y][0] == "P" && (grid[x][y + 1] == undefined || (grid[x][y + 1] && grid[x][y + 1] != "." && grid[x][y + 1] != "S" && grid[x][y + 1][0] != "P")))
                return false;
            if (nb > 0 && grid[x][y][0] == "P" && (grid[x][y - 1] == undefined || (grid[x][y - 1] && grid[x][y - 1] != "." && grid[x][y - 1] != "S" && grid[x][y - 1][0] != "P")))
                return false;
            y -= 1;
        }
        x -= 1;
    }
    return ret;
}
exports.okForMoveLateral = okForMoveLateral;
function updateRoomFoorAll(room, io) {
    if (room)
        for (var i in room.players) {
            io.to(room.players[i].socketID).emit('action', { type: 'joinRoom', room: room, master: room.players[i].gameMaster });
        }
}
exports.updateRoomFoorAll = updateRoomFoorAll;
function resetRoomSpec(room) {
    room.status = "waiting";
    room.Pieces = [];
    for (var i in room.players) {
        room.players[i].hit = false;
        room.players[i].spec = false;
        room.players[i].loose = false;
        room.players[i].currentPiece = 0;
    }
    return room;
}
exports.resetRoomSpec = resetRoomSpec;
function isEndGame(room) {
    for (var i in room.players) {
        if (room.players[i].loose == false)
            return false;
    }
    return true;
}
exports.isEndGame = isEndGame;
