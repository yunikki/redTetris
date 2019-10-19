"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var piece_1 = __importDefault(require("./piece"));
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
exports.getRandomInt = getRandomInt;
function randPiece() {
    switch (getRandomInt(5)) {
        case 0: //carre
            return (piece_1.default.square());
            break;
        case 1: //L
            switch (getRandomInt(4)) {
                case 0:
                    return (piece_1.default.tetriL());
                    break;
                case 1:
                    return (piece_1.default.tetriL2());
                    break;
                case 2:
                    return (piece_1.default.tetriL3());
                    break;
                case 3:
                    return (piece_1.default.tetriL4());
                    break;
                default:
                    piece_1.default.tetriL();
                    break;
            }
            break;
        case 2:
            switch (getRandomInt(2)) {
                case 0:
                    return (piece_1.default.tetriZ());
                    break;
                case 1:
                    return (piece_1.default.tetriZ2());
                    break;
                default:
                    piece_1.default.tetriZ();
                    break;
            }
            break;
        case 3:
            switch (getRandomInt(2)) {
                case 0:
                    return (piece_1.default.bar());
                    break;
                case 1:
                    return (piece_1.default.bar2());
                    break;
                default:
                    piece_1.default.bar();
                    break;
            }
            break;
        case 4:
            switch (getRandomInt(4)) {
                case 0:
                    return (piece_1.default.tetriT());
                    break;
                case 1:
                    return (piece_1.default.tetriT2());
                    break;
                case 2:
                    return (piece_1.default.tetriT3());
                    break;
                case 3:
                    return (piece_1.default.tetriT4());
                    break;
                default:
                    piece_1.default.tetriT();
                    break;
            }
            break;
        default:
            break;
    }
}
function epurPiece(p) {
    for (var i in p) {
        if (p[i] == "....") {
            p.splice(i, 1);
        }
    }
    return p;
}
function randColor() {
    var r = getRandomInt(4);
    switch (r) {
        case 0:
            return ('PR');
        case 1:
            return ('PG');
        case 2:
            return ('PB');
        case 3:
            return ('PO');
        case 4:
            return ('PV');
        default:
            break;
    }
}
function setNewPieceInGridForAll(room) {
    var p = epurPiece(room.Pieces[0].piece);
    var c = randColor();
    for (var i in room.players) {
        for (var l in p) {
            var l_grid = 3;
            var l_piece = 0;
            while (l_piece < 4) {
                if (p[l][l_piece] == "#")
                    room.players[i].grid[l][l_grid] = c;
                l_grid += 1;
                l_piece += 1;
            }
        }
    }
    return room;
}
exports.setNewPieceInGridForAll = setNewPieceInGridForAll;
function setNewPieceInGrid(player, piece) {
    var p = epurPiece(piece);
    var c = randColor();
    for (var l in p) {
        var l_grid = 3;
        var l_piece = 0;
        while (l_piece < 4) {
            if (player.grid[l][l_grid] != ".") {
                player.loose = true;
                return player;
            }
            else if (p[l][l_piece] == "#")
                player.grid[l][l_grid] = c;
            l_grid += 1;
            l_piece += 1;
        }
    }
    return player;
}
exports.setNewPieceInGrid = setNewPieceInGrid;
var pieces = /** @class */ (function () {
    function pieces() {
        this.piece = randPiece();
        this.next = undefined;
    }
    pieces.prototype.addNewMallion = function () {
        this.next = new pieces;
    };
    return pieces;
}());
exports.pieces = pieces;
function getPieces() {
    //var c = new pieces;
    return (randPiece());
}
exports.getPieces = getPieces;
function okForFall(grid) {
    var x = 19;
    while (x >= 0) {
        var y = 9;
        while (y >= 0) {
            if (grid[x][y][0] == "P" && (grid[x + 1] == undefined || (grid[x + 1][y] != "." && grid[x + 1][y][0] != "P")))
                return false;
            y -= 1;
        }
        x -= 1;
    }
    return true;
}
function fall_piece(room) {
    var i = 0;
    for (i in room.players) {
        if (room.players[i].loose)
            continue;
        if (okForFall(room.players[i].grid)) {
            room.players[i].hit = false;
            var x = 19;
            while (x >= 0) {
                var y = 9;
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
            var x = 19;
            while (x >= 0) {
                var y = 9;
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
                room.players[i] = setNewPieceInGrid(room.players[i], new_pices);
            }
            else {
                room.Pieces.push(new pieces());
                var new_pices = room.Pieces[room.players[i].currentPiece].piece;
                room.players[i] = setNewPieceInGrid(room.players[i], new_pices);
            }
        }
    }
    return (room);
}
exports.fall_piece = fall_piece;
function floorPiece(room, id) {
    var players = undefined;
    clearInterval(room.stop);
    for (var i in room.players) {
        if (room.players[i].loose)
            continue;
        if (room.players[i].socketID == id) {
            while (okForFall(room.players[i].grid)) {
                var x_1 = 19;
                while (x_1 >= 0) {
                    var y = 9;
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
            var x = 19;
            while (x >= 0) {
                var y = 9;
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
                room.players[i] = setNewPieceInGrid(room.players[i], new_pices);
            }
            else {
                room.Pieces.push(new pieces());
                var new_pices = room.Pieces[room.players[i].currentPiece].piece;
                room.players[i] = setNewPieceInGrid(room.players[i], new_pices);
            }
            break;
        }
    }
    return (room);
}
exports.floorPiece = floorPiece;
function featherDrop(room, id) {
    var players = undefined;
    clearInterval(room.stop);
    for (var i in room.players) {
        if (room.players[i].loose)
            continue;
        if (room.players[i].socketID == id) {
            if (okForFall(room.players[i].grid)) {
                var x = 19;
                while (x >= 0) {
                    var y = 9;
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
                var x = 19;
                while (x >= 0) {
                    var y = 9;
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
                    room.players[i] = setNewPieceInGrid(room.players[i], new_pices);
                }
                else {
                    room.Pieces.push(new pieces());
                    var new_pices = room.Pieces[room.players[i].currentPiece].piece;
                    room.players[i] = setNewPieceInGrid(room.players[i], new_pices);
                }
            }
            break;
        }
    }
    return (room);
}
exports.featherDrop = featherDrop;
