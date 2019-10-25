import { creatSpeactre } from './creatSpectre'
import { okForMoveLateral } from "./lib"

export function moveRight(room, id) {
    for (let i in room.players) {
        if (room.players[i].loose)
            continue;
        if (room.players[i].socketID == id && okForMoveLateral(room.players[i].grid, room, -1)) {
            let x = 0
            let compar = room.rules[1] ? 12 : 20
            while (x < compar) {
                let y = room.rules[1] ? 7 : 9
                while (y >= 0) {
                    if (room.players[i].grid[x][y] && room.players[i].grid[x][y][0] == "P") {
                        room.players[i].grid[x][y + 1] = room.players[i].grid[x][y]
                        room.players[i].grid[x][y] = '.'
                    }
                    y -= 1
                }
                x += 1
            }
            break
        }
    }
    room = creatSpeactre(room)
    return (room)
}
