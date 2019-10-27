"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var creatSpectre_1 = require("./creatSpectre");
var lib_1 = require("./lib");
function floorPiece(room, id) {
    clearInterval(room.stop);
    for (var i in room.players) {
        if (room.players[i].loose)
            return room;
        if (room.players[i].socketID == id) {
            while (lib_1.okForFall(room.players[i].grid, room)) {
                room = lib_1.falling_piece(room, i);
            }
            room = lib_1.end_fall(room, i);
            break;
        }
    }
    room = creatSpectre_1.creatSpeactre(room);
    return (room);
}
exports.floorPiece = floorPiece;
