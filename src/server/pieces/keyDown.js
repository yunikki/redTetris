import { okForFall } from './okForFall'
import { creatSpeactre } from './creatSpectre'

export function featherDrop(room, id) {
    let players = undefined
    clearInterval(room.stop)
    for (let i in room.players) {
        if (room.players[i].loose)
            continue;
        if (room.players[i].socketID == id) {
            if (okForFall(room.players[i].grid, room)) {
                let x = room.rules[1] ? 11 : 19
                while (x >= 0) {
                    let y = room.rules[1] ? 7 : 9
                    while (y >= 0) {
                        if (room.players[i].grid[x + 1] && room.players[i].grid[x][y][0] == "P") {
                            room.players[i].grid[x + 1][y] = room.players[i].grid[x][y]
                            room.players[i].grid[x][y] = "."
                        }
                        y -= 1
                    }
                    x -= 1
                }
            }
            else if (room.players[i].hit == false) {
                room.players[i].hit = true;
            }
            else {
                room.players[i].hit = false
                let x = room.rules[1] ? 11 : 19
                while (x >= 0) {
                    let y = room.rules[1] ? 7 : 9
                    while (y >= 0) {
                        if (room.players[i].grid[x][y][0] == "P") {
                            room.players[i].grid[x][y] = room.players[i].grid[x][y].substring(1, 2)

                        }
                        y -= 1
                    }
                    x -= 1
                }
                room.players[i].currentPiece += 1
                if (room.Pieces[room.players[i].currentPiece + 1]) {
                    let new_pices = room.Pieces[room.players[i].currentPiece].piece
                    room = setNewPieceInGrid(room, i, new_pices)
                    room = creatSpeactre(room)
                }
                else {
                    room.Pieces.push(new pieces())
                    let new_pices = room.Pieces[room.players[i].currentPiece].piece
                    room = setNewPieceInGrid(room, i, new_pices)
                    room = creatSpeactre(room)
                }
            }
            break
        }
    }
    return (room)
}