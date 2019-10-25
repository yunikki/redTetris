"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lib_1 = require("./lib");
function featherDrop(room, id) {
    var players = undefined;
    clearInterval(room.stop);
    for (var i in room.players) {
        if (room.players[i].loose)
            continue;
        if (room.players[i].socketID == id) {
            if (lib_1.okForFall(room.players[i].grid, room)) {
                room = lib_1.falling_piece(room, i);
            }
            else if (room.players[i].hit == false) {
                room.players[i].hit = true;
            }
            else
                room = lib_1.end_fall(room, i);
            break;
        }
    }
    return (room);
}
exports.featherDrop = featherDrop;
