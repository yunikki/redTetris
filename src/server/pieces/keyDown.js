import { falling_piece, end_fall, okForFall } from "./lib"

export function featherDrop(room, id) {
    let players = undefined
    clearInterval(room.stop)
    for (let i in room.players) {
        if (room.players[i].loose)
            continue;
        if (room.players[i].socketID == id) {
            if (okForFall(room.players[i].grid, room)) {
                room = falling_piece(room, i)
            }
            else if (room.players[i].hit == false) {
                room.players[i].hit = true;
            }
            else
                room = end_fall(room, i)
            break
        }
    }
    return (room)
}
