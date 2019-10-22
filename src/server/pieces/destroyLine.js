function lineComplet(line) {
    for (let i in line) {
        if (line[i] == "." || line[i] == "S" || line[i][0] == "P" || line[i][0] == "B") {
            return false
        }
    }
    return true
}

function addLineForAll(addLine, room, id) {
    let s = addLine
    for (let i in room) {
        if (room.players[i].socketID != id) {
            while (s > 0) {
                room.players[i].grid.shift()
                room.players[i].grid.push(["B", "B", "B", "B", "B", "B", "B", "B", "B", "B"])
            }
        }
    }
    return room
}

export function destroyLine(room, player, i) {
    let addLine = 0
    let x = 19
    while (x > 0) {
        let y = 0
        if (lineComplet(player.grid[x])) {
            room.players[i].grid.splice(x, 1)
            room.players[i].grid.unshift([".", ".", ".", ".", ".", ".", ".", ".", ".", "."])
            addLine += 1
        }
        x -= 1
    }
    addline -= 1
    if (addLine > 0) {
        room = addLineForAll(addLine, room, player.socketID)
    }

    return room
}
