"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function lineComplet(line) {
    for (var i in line) {
        if (line[i] == "." || line[i] == "S" || line[i][0] == "P" || line[i][0] == "b") {
            return false;
        }
    }
    return true;
}
function lineLoose(line) {
    for (var i in line) {
        if (line[i] != "." && line[i] != "S") {
            return true;
        }
    }
    return false;
}
function getPosePiece(grid) {
    var save = [];
    for (var x in grid) {
        for (var y in grid[x]) {
            if (grid[x][y][0] == "P")
                save.push([x, y]);
        }
    }
    return save;
}
function getTypePiece(grid) {
    var save = [];
    for (var x in grid) {
        for (var y in grid[x]) {
            if (grid[x][y][0] == "P") {
                return grid[x][y];
            }
        }
    }
    return save;
}
function rmPieceOfGrid(grid) {
    var save = [];
    for (var x in grid) {
        for (var y in grid[x]) {
            if (grid[x][y][0] == "P")
                grid[x][y] = ".";
        }
    }
    return grid;
}
function addLineForAll(addLine, room, id) {
    for (var i in room.players) {
        var s = addLine;
        if (room.players[i].socketID != id) {
            var save = getPosePiece(room.players[i].grid);
            var type = getTypePiece(room.players[i].grid);
            room.players[i].grid = rmPieceOfGrid(room.players[i].grid);
            while (s > 0) {
                if (room.players[i].loose == false && lineLoose(room.players[i].grid[0]))
                    room.players[i].loose = true;
                room.players[i].grid.shift();
                room.players[i].grid.push(room.rules[1] ? ["b", "b", "b", "b", "b", "b", "b", "b"] : ["b", "b", "b", "b", "b", "b", "b", "b", "b", "b"]);
                s -= 1;
            }
            var pose = true;
            var x = 0;
            while (pose && save.length == 4) {
                if (Math.abs(x - save[0][0]) < 0) {
                    room.players[i].loose = true;
                    break;
                }
                if (room.players[i].grid[Math.abs(x - save[0][0])][save[0][1]] == "." &&
                    room.players[i].grid[Math.abs(x - save[1][0])][save[1][1]] == "." &&
                    room.players[i].grid[Math.abs(x - save[2][0])][save[2][1]] == "." &&
                    room.players[i].grid[Math.abs(x - save[3][0])][save[3][1]] == ".") {
                    room.players[i].grid[Math.abs(x - save[0][0])][save[0][1]] = type;
                    room.players[i].grid[Math.abs(x - save[1][0])][save[1][1]] = type;
                    room.players[i].grid[Math.abs(x - save[2][0])][save[2][1]] = type;
                    room.players[i].grid[Math.abs(x - save[3][0])][save[3][1]] = type;
                    pose = false;
                }
                else
                    x += 1;
            }
        }
    }
    return room;
}
function destroyLine(room, player, i) {
    var addLine = 0;
    var x = 0;
    var compar = room.rules[1] ? 12 : 20;
    while (x < compar) {
        var y = 0;
        if (lineComplet(room.players[i].grid[x])) {
            room.players[i].grid.splice(x, 1);
            room.players[i].grid.unshift(room.rules[1] ? [".", ".", ".", ".", ".", ".", ".", "."] : [".", ".", ".", ".", ".", ".", ".", ".", ".", "."]);
            addLine += 1;
        }
        x += 1;
    }
    if (addLine == 1)
        room.players[i].score += 40;
    else if (addLine == 2)
        room.players[i].score += 100;
    else if (addLine == 3)
        room.players[i].score += 300;
    else if (addLine == 4)
        room.players[i].score += 1200;
    addLine -= 1;
    if (addLine > 0) {
        room = addLineForAll(addLine, room, room.players[i].socketID);
    }
    return room;
}
exports.destroyLine = destroyLine;
