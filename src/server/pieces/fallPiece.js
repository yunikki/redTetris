import { creatSpeactre } from "./creatSpectre"
import { falling_piece, end_fall, okForFall } from "./lib"

export function fall_piece(room, id) {
    let i = 0
    for (i in room.players) {
        if (room.players[i].socketID == id) {
            if (room.players[i].loose)
                return (room);
            if (okForFall(room.players[i].grid, room)) {
                room.players[i].hit = false
                falling_piece(room, i)
            }
            else if (room.players[i].hit == false)
                room.players[i].hit = true;
            else
                room = end_fall(room, i)
        }
    }
    room = creatSpeactre(room)
    return (room)
}
