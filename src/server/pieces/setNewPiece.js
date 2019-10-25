import { creatSpeactre } from "./creatSpectre"
import { destroyLine } from "./destroyLine"

function epurPiece(p) {
    for (let i in p) {
        if (p[i] == "....") {
            p.splice(i, 1)
        }
    }
    return p
}

function randColor(p) {
    switch (p) {
        case "C":
            return ('PC');
        case "B":
            return ('PB');
        case "T":
            return ('PT');
        case "L":
            return ('PL');
        case "l":
            return ('Pl');
        case "Z":
            return ('PZ');
        case "z":
            return ('Pz');




        default:
            return ('PV');
            break;
    }
}

export function setNewPieceInGridForAll(room) {
    let p = epurPiece(room.Pieces[0].piece)
    for (let i in room.players) {
        for (let l in p) {
            let l_grid = 3;
            let l_piece = 0
            while (l_piece < 4) {
                if (p[l][l_piece] != ".")
                    room.players[i].grid[l][l_grid] = randColor(p[l][l_piece])
                l_grid += 1;
                l_piece += 1
            }
        }
    }
    room = creatSpeactre(room)
    return room
}

function allLoose(room) {
    for (let i in room.players) {
        if (room.players[i].loose == false)
            return false
    }
    return (true)
}

export function setNewPieceInGrid(room, i, piece) {
    room = destroyLine(room, room.players[i], i)
    let p = epurPiece(piece)
    for (let l in p) {
        let l_grid = 3;
        let l_piece = 0
        while (l_piece < 4) {
            if (room.players[i].grid[l][l_grid] != ".") {
                room.players[i].loose = true
                if (allLoose(room))
                    room.status = "waiting"
                break
            }
            else if (p[l][l_piece] != ".")
                room.players[i].grid[l][l_grid] = randColor(p[l][l_piece])

            l_grid += 1;
            l_piece += 1
        }
    }

    return room
}
