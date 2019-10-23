function lineComplet(line) {
    for (let i in line) {
        if (line[i] == "." || line[i] == "S" || line[i][0] == "P" || line[i][0] == "b") {
            return false
        }
    }
    return true
}

function addLineForAll(addLine, room, id) {
    let s = addLine
    for (let i in room.players) {
        if (room.players[i].socketID != id) {
            while (s > 0) {
                room.players[i].grid.shift()
                room.players[i].grid.push(room.rules[1] ? ["b", "b", "b", "b", "b", "b", "b", "b"] : ["b", "b", "b", "b", "b", "b", "b", "b", "b", "b"])
                s -= 1
            }
        }
    }
    return room
}

export function destroyLine(room, player, i) {
    let addLine = 0
    let x = 0
    let compar = room.rules[1] ? 12 : 20
    while (x < compar) {
        let y = 0
        if (lineComplet(room.players[i].grid[x])) {
            room.players[i].grid.splice(x, 1)
            room.players[i].grid.unshift(room.rules[1] ? [".", ".", ".", ".", ".", ".", ".", "."] : [".", ".", ".", ".", ".", ".", ".", ".", ".", "."])
            addLine += 1
        }
        x += 1
    }
    if (addLine == 1)
        room.players[i].score += 40
    else if (addLine == 2)
        room.players[i].score += 100
    else if (addLine == 3)
        room.players[i].score += 300
    else if (addLine == 4)
        room.players[i].score += 1200
    addLine -= 1
    if (addLine > 0) {
        room = addLineForAll(addLine, room, room.players[i].socketID)
    }

    return room
}
