"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lib_1 = require("./lib");
function creatSpeactre(room) {
    var c = "P";
    for (var i in room.players) {
        var save = [];
        var x = room.rules[1] ? 11 : 19;
        while (x >= 0) {
            var y = room.rules[1] ? 7 : 9;
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
        while (lib_1.okForFall(room.players[i].grid, room)) {
            room = lib_1.falling_piece(room, i);
        }
        x = room.rules[1] ? 11 : 19;
        while (x >= 0) {
            y = room.rules[1] ? 7 : 9;
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
exports.creatSpeactre = creatSpeactre;
