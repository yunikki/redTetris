"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var creatSpectre_1 = require("./creatSpectre");
var lib_1 = require("./lib");
function moveLeft(room, id) {
    for (var i in room.players) {
        if (room.players[i].loose)
            continue;
        if (room.players[i].socketID == id && lib_1.okForMoveLateral(room.players[i].grid, room, 1)) {
            var x = 0;
            var compar = room.rules[1] ? 12 : 20;
            while (x < compar) {
                var y = 0;
                var compar2 = room.rules[1] ? 8 : 10;
                while (y < compar2) {
                    if (room.players[i].grid[x][y] && room.players[i].grid[x][y][0] == "P") {
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
    room = creatSpectre_1.creatSpeactre(room);
    return (room);
}
exports.moveLeft = moveLeft;
