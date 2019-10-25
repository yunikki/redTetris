"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var creatSpectre_1 = require("./creatSpectre");
var lib_1 = require("./lib");
function fall_piece(room, id) {
    var i = 0;
    for (i in room.players) {
        if (room.players[i].socketID == id) {
            if (room.players[i].loose)
                return (room);
            if (lib_1.okForFall(room.players[i].grid, room)) {
                room.players[i].hit = false;
                lib_1.falling_piece(room, i);
            }
            else if (room.players[i].hit == false)
                room.players[i].hit = true;
            else
                room = lib_1.end_fall(room, i);
        }
    }
    room = creatSpectre_1.creatSpeactre(room);
    return (room);
}
exports.fall_piece = fall_piece;
