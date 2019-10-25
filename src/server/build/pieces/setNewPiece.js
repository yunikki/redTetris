"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var creatSpectre_1 = require("./creatSpectre");
var destroyLine_1 = require("./destroyLine");
function epurPiece(p) {
    for (var i in p) {
        if (p[i] == "....") {
            p.splice(i, 1);
        }
    }
    return p;
}
function randColor(p) {
    switch (p) {
        case "C":
            return ('PC');
        case "B":
            return ('PB');
        case "T":
            return ('PT');
        case "L":
            return ('PL');
        case "l":
            return ('Pl');
        case "Z":
            return ('PZ');
        case "z":
            return ('Pz');
        default:
            return ('PV');
            break;
    }
}
function setNewPieceInGridForAll(room) {
    var p = epurPiece(room.Pieces[0].piece);
    for (var i in room.players) {
        for (var l in p) {
            var l_grid = 3;
            var l_piece = 0;
            while (l_piece < 4) {
                if (p[l][l_piece] != ".")
                    room.players[i].grid[l][l_grid] = randColor(p[l][l_piece]);
                l_grid += 1;
                l_piece += 1;
            }
        }
    }
    room = creatSpectre_1.creatSpeactre(room);
    return room;
}
exports.setNewPieceInGridForAll = setNewPieceInGridForAll;
function allLoose(room) {
    for (var i in room.players) {
        if (room.players[i].loose == false)
            return false;
    }
    return (true);
}
function setNewPieceInGrid(room, i, piece) {
    room = destroyLine_1.destroyLine(room, room.players[i], i);
    var p = epurPiece(piece);
    for (var l in p) {
        var l_grid = 3;
        var l_piece = 0;
        while (l_piece < 4) {
            if (room.players[i].grid[l][l_grid] != ".") {
                room.players[i].loose = true;
                if (allLoose(room))
                    room.status = "waiting";
                break;
            }
            else if (p[l][l_piece] != ".")
                room.players[i].grid[l][l_grid] = randColor(p[l][l_piece]);
            l_grid += 1;
            l_piece += 1;
        }
    }
    return room;
}
exports.setNewPieceInGrid = setNewPieceInGrid;
