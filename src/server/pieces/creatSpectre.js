import { okForFall } from "./okForFall"

export function creatSpeactre(room) {
    let c = "P"
    for (let i in room.players) {
        let save = []
        let x = room.rules[1] ? 11 : 19
        while (x >= 0) {
            let y = room.rules[1] ? 7 : 9
            while (y >= 0) {
                if (room.players[i].grid[x][y][0] == "S")
                    room.players[i].grid[x][y] = "."
                if (room.players[i].grid[x][y][0] == "P") {
                    save.push([x, y])
                    c = room.players[i].grid[x][y]
                }
                y -= 1
            }
            x -= 1
        }
        while (okForFall(room.players[i].grid, room)) {
            x = room.rules[1] ? 11 : 19
            while (x >= 0) {
                y = room.rules[1] ? 7 : 9
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

        x = room.rules[1] ? 11 : 19
        while (x >= 0) {
            y = room.rules[1] ? 7 : 9
            while (y >= 0) {
                if (room.players[i].grid[x] && room.players[i].grid[x][y][0] == "P") {
                    room.players[i].grid[x][y] = "S"
                }
                y -= 1
            }
            x -= 1
        }
        x = 0;
        while (x < 4 && save[x]) {
            room.players[i].grid[save[x][0]][save[x][1]] = c
            x += 1
        }
    }
    return room
}
