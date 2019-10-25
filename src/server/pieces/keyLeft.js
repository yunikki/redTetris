import { creatSpeactre } from './creatSpectre'

function okForMoveLeft(grid, room) {
    let x = room.rules[1] ? 11 : 19
    let ret = true
    while (x >= 0) {
        let y = room.rules[1] ? 7 : 9
        while (y >= 0) {
            if (grid[x][y][0] == "P" && (grid[x][y - 1] == undefined || (grid[x][y - 1] && grid[x][y - 1] != "." && grid[x][y - 1] != "S" && grid[x][y - 1][0] != "P")))
                return false
            y -= 1
        }
        x -= 1
    }
    return ret
}

export function moveLeft(room, id) {
    for (let i in room.players) {
        if (room.players[i].loose)
            continue;
        if (room.players[i].socketID == id && okForMoveLeft(room.players[i].grid, room)) {
            let x = 0
            let compar = room.rules[1] ? 12 : 20
            while (x < compar) {
                let y = 0
                let compar2 = room.rules[1] ? 8 : 10
                while (y < compar2) {
                    if (room.players[i].grid[x][y][0] == "P") {
                        room.players[i].grid[x][y - 1] = room.players[i].grid[x][y]
                        room.players[i].grid[x][y] = '.'
                    }
                    y += 1
                }
                x += 1
            }
            break
        }
    }
    room = creatSpeactre(room)
    return (room)
}
