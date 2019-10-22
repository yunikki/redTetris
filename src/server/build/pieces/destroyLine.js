"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function lineComplet(line) {
    for (var i in line) {
        if (line[i] == "." || line[i] == "S" || line[i][0] == "P" || line[i][0] == "B") {
            return false;
        }
    }
    return true;
}
function addLineForAll(addLine, room, id) {
    var s = addLine;
    for (var i in room) {
        if (room.players[i].socketID != id) {
            while (s > 0) {
                room.players[i].grid.shift();
                room.players[i].grid.push(room.rules[1] ? ["B", "B", "B", "B", "B", "B", "B", "B"] : ["B", "B", "B", "B", "B", "B", "B", "B", "B", "B"]);
            }
        }
    }
    return room;
}
function destroyLine(room, player, i) {
    var addLine = 0;
    var x = room.rules[1] ? 11 : 19;
    while (x > 0) {
        var y = 0;
        if (lineComplet(player.grid[x])) {
            room.players[i].grid.splice(x, 1);
            room.players[i].grid.unshift(room.rules[1] ? [".", ".", ".", ".", ".", ".", ".", "."] : [".", ".", ".", ".", ".", ".", ".", ".", ".", "."]);
            addLine += 1;
        }
        x -= 1;
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
        room = addLineForAll(addLine, room, player.socketID);
    }
    return room;
}
exports.destroyLine = destroyLine;