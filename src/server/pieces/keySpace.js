import { creatSpeactre } from "./creatSpectre"
import { creatSpeactre } from "./creatSpectre"
import { falling_piece, end_fall, okForFall } from "./lib"

export function floorPiece(room, id) {
    clearInterval(room.stop)
    for (let i in room.players) {
        if (room.players[i].socketID == id) {
            if (room.players[i].loose)
                return room;
            while (okForFall(room.players[i].grid, room)) {
                room = falling_piece(room, i)
            }
            room = end_fall(room, i)
            break
        }
    }
    room = creatSpeactre(room)
    return (room)
}
