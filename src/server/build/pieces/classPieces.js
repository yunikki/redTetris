"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var piece_1 = __importDefault(require("./piece"));
var destroyLine_1 = require("./destroyLine");
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
exports.getRandomInt = getRandomInt;
function randPiece() {
    switch (getRandomInt(7)) {
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
        case 5: //L
            switch (getRandomInt(4)) {
                case 0:
                    return (piece_1.default.tetriL5());
                    break;
                case 1:
                    return (piece_1.default.tetriL6());
                    break;
                case 2:
                    return (piece_1.default.tetriL7());
                    break;
                case 3:
                    return (piece_1.default.tetriL8());
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
        case 6:
            switch (getRandomInt(2)) {
                case 0:
                    return (piece_1.default.tetriZ3());
                    break;
                case 1:
                    return (piece_1.default.tetriZ4());
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
    room = creatSpeactre(room);
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
    room = destroyLine_1.destroyLine(room);
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
    if (!grid)
        return (false);
    var x = 19;
    var ret = true;
    var c = 0;
    while (x >= 0) {
        var y = 9;
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
function creatSpeactre(room) {
    var c = "P";
    for (var i in room.players) {
        var save = [];
        var x = 19;
        while (x >= 0) {
            var y = 9;
            while (y >= 0) {
                if (room.players[i].grid[x][y][0] == "S")
                    room.players[i].grid[x][y] = ".";
                if (room.players[i].grid[x][y][0] == "P") {
                    save.push([x, y]);
                    c = room.players[i].grid[x][y];
                }
                y -= 1;
            }
            x -= 1;
        }
        while (okForFall(room.players[i].grid)) {
            x = 19;
            while (x >= 0) {
                y = 9;
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
        x = 19;
        while (x >= 0) {
            y = 9;
            while (y >= 0) {
                if (room.players[i].grid[x] && room.players[i].grid[x][y][0] == "P") {
                    room.players[i].grid[x][y] = "S";
                }
                y -= 1;
            }
            x -= 1;
        }
        x = 0;
        while (x < 4 && save[x]) {
            room.players[i].grid[save[x][0]][save[x][1]] = c;
            x += 1;
        }
    }
    return room;
}
function fall_piece(room, id) {
    var i = 0;
    for (i in room.players) {
        if (room.players[i].socketID == id) {
            if (room.players[i].loose)
                return (room);
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
                    room = setNewPieceInGrid(room, i, new_pices);
                    room = creatSpeactre(room);
                }
                else {
                    room.Pieces.push(new pieces());
                    var new_pices = room.Pieces[room.players[i].currentPiece].piece;
                    room = setNewPieceInGrid(room, i, new_pices);
                    room = creatSpeactre(room);
                }
            }
        }
    }
    room = creatSpeactre(room);
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
                room = setNewPieceInGrid(room, i, new_pices);
                room = creatSpeactre(room);
            }
            else {
                room.Pieces.push(new pieces());
                var new_pices = room.Pieces[room.players[i].currentPiece].piece;
                room = setNewPieceInGrid(room, i, new_pices);
                room = creatSpeactre(room);
            }
            break;
        }
    }
    room = creatSpeactre(room);
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
                    room = setNewPieceInGrid(room, i, new_pices);
                    room = creatSpeactre(room);
                }
                else {
                    room.Pieces.push(new pieces());
                    var new_pices = room.Pieces[room.players[i].currentPiece].piece;
                    room = setNewPieceInGrid(room, i, new_pices);
                    room = creatSpeactre(room);
                }
            }
            break;
        }
    }
    return (room);
}
exports.featherDrop = featherDrop;
function okForMoveLeft(grid) {
    var x = 19;
    var ret = true;
    while (x >= 0) {
        var y = 9;
        while (y >= 0) {
            if (grid[x][y][0] == "P" && (grid[x][y - 1] == undefined || (grid[x][y - 1] && grid[x][y - 1] != "." && grid[x][y - 1] != "S" && grid[x][y - 1][0] != "P")))
                return false;
            y -= 1;
        }
        x -= 1;
    }
    return ret;
}
function moveLeft(room, id) {
    for (var i in room.players) {
        if (room.players[i].loose)
            continue;
        if (room.players[i].socketID == id && okForMoveLeft(room.players[i].grid)) {
            var x = 0;
            while (x < 20) {
                var y = 0;
                while (y < 10) {
                    if (room.players[i].grid[x][y][0] == "P") {
                        room.players[i].grid[x][y - 1] = room.players[i].grid[x][y];
                        room.players[i].grid[x][y] = '.';
                    }
                    y += 1;
                }
                x += 1;
            }
            break;
        }
    }
    room = creatSpeactre(room);
    return (room);
}
exports.moveLeft = moveLeft;
function okForMoveRight(grid) {
    var x = 19;
    var ret = true;
    while (x >= 0) {
        var y = 9;
        while (y >= 0) {
            if (grid[x][y][0] == "P" && (grid[x][y + 1] == undefined || (grid[x][y + 1] && grid[x][y + 1] != "." && grid[x][y + 1] != "S" && grid[x][y + 1][0] != "P")))
                return false;
            y -= 1;
        }
        x -= 1;
    }
    return ret;
}
function moveRight(room, id) {
    for (var i in room.players) {
        if (room.players[i].loose)
            continue;
        if (room.players[i].socketID == id && okForMoveRight(room.players[i].grid)) {
            var x = 0;
            while (x < 20) {
                var y = 9;
                while (y >= 0) {
                    if (room.players[i].grid[x][y] && room.players[i].grid[x][y][0] == "P") {
                        room.players[i].grid[x][y + 1] = room.players[i].grid[x][y];
                        room.players[i].grid[x][y] = '.';
                    }
                    y -= 1;
                }
                x += 1;
            }
            break;
        }
    }
    room = creatSpeactre(room);
    return (room);
}
exports.moveRight = moveRight;
function resetParty(room) {
    for (var i in room.players) {
        room.players[i].loose = false;
        room.players[i].grid = [[".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", ".", "."]];
    }
    return room;
}
exports.resetParty = resetParty;
