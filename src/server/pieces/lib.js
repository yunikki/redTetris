import { pieces } from "../pieces/classPieces"
import { setNewPieceInGrid } from "./setNewPiece"
import { creatSpeactre } from "./creatSpectre"

export function falling_piece(room, i) {
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
    return (room)
}


export function end_fall(room, i) {
    room.players[i].hit = false
    let x = room.rules[1] ? 11 : 19
    while (x >= 0) {
        let y = room.rules[1] ? 7 : 9
        while (y >= 0) {
            if (room.players[i].grid[x][y][0] == "P")
                room.players[i].grid[x][y] = room.players[i].grid[x][y].substring(1, 2)
            y -= 1
        }
        x -= 1
    }
    room.players[i].currentPiece += 1
    if (room.Pieces[room.players[i].currentPiece] && room.Pieces[room.players[i].currentPiece + 1]) {
        let new_pices = room.Pieces[room.players[i].currentPiece].piece
        room = setNewPieceInGrid(room, i, new_pices)
        room = creatSpeactre(room)
    }
    else if (room.Pieces[room.players[i].currentPiece]) {
        room.Pieces.push(new pieces())
        let new_pices = room.Pieces[room.players[i].currentPiece].piece
        room = setNewPieceInGrid(room, i, new_pices)
        room = creatSpeactre(room)
    }
    return (room)
}

export function okForFall(grid, room) {
    if (!grid)
        return (false)
    let x = room.rules[1] ? 11 : 19
    let ret = true
    let c = 0
    while (x >= 0) {
        let y = room.rules[1] ? 7 : 9
        while (y >= 0) {
            if (grid[x][y][0] == "P")
                c += 1
            if (grid[x][y][0] == "P" && (grid[x + 1] == undefined || (grid[x + 1][y] != "." && grid[x + 1][y] != "S" && grid[x + 1][y][0] != "P")))
                return false
            y -= 1
        }
        x -= 1
    }
    if (c != 4)
        return false
    return ret
}


export function okForMoveLateral(grid, room, nb) {
    let x = room.rules[1] ? 11 : 19
    let ret = true
    while (x >= 0) {
        let y = room.rules[1] ? 7 : 9
        while (y >= 0) {
            if (nb < 0 && grid[x][y][0] == "P" && (grid[x][y + 1] == undefined || (grid[x][y + 1] && grid[x][y + 1] != "." && grid[x][y + 1] != "S" && grid[x][y + 1][0] != "P")))
                return false
            if (nb > 0 && grid[x][y][0] == "P" && (grid[x][y - 1] == undefined || (grid[x][y - 1] && grid[x][y - 1] != "." && grid[x][y - 1] != "S" && grid[x][y - 1][0] != "P")))
                return false
            y -= 1
        }
        x -= 1
    }
    return ret
}


export function updateRoomFoorAll(room, io) {
    if (room)
        for (var i in room.players) {
            io.to(room.players[i].socketID).emit('action', { type: 'joinRoom', room: room, master: room.players[i].gameMaster })
        }
}

export function resetRoomSpec(room) {
    room.status = "waiting"
    room.Pieces = []
    for (let i in room.players) {
        room.players[i].hit = false
        room.players[i].spec = false
        room.players[i].loose = false
        room.players[i].currentPiece = 0
    }
    return room
}

export function isEndGame(room) {
    for (let i in room.players) {
        if (room.players[i].loose == false)
            return false
    }
    return true
}
