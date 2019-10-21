import p from "./piece"

export function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function randPiece() {
    switch (getRandomInt(7)) {
        case 0: //carre
            return (p.square())
            break;
        case 1: //L
            switch (getRandomInt(4)) {
                case 0:
                    return (p.tetriL());
                    break;
                case 1:
                    return (p.tetriL2());
                    break;
                case 2:
                    return (p.tetriL3());
                    break;
                case 3:
                    return (p.tetriL4());
                    break;
                default:
                    p.tetriL()
                    break;
            }
            break;
        case 5: //L
            switch (getRandomInt(4)) {
                case 0:
                    return (p.tetriL5());
                    break;
                case 1:
                    return (p.tetriL6());
                    break;
                case 2:
                    return (p.tetriL7());
                    break;
                case 3:
                    return (p.tetriL8());
                    break;
                default:
                    p.tetriL()
                    break;
            }
            break;

        case 2:
            switch (getRandomInt(2)) {
                case 0:
                    return (p.tetriZ());
                    break;
                case 1:
                    return (p.tetriZ2());
                    break;
                default:
                    p.tetriZ()
                    break;
            }
            break;
        case 6:
            switch (getRandomInt(2)) {
                case 0:
                    return (p.tetriZ3());
                    break;
                case 1:
                    return (p.tetriZ4());
                    break;
                default:
                    p.tetriZ()
                    break;
            }
            break;
        case 3:
            switch (getRandomInt(2)) {
                case 0:
                    return (p.bar());
                    break;
                case 1:
                    return (p.bar2());
                    break;
                default:
                    p.bar()
                    break;
            }
            break
        case 4:
            switch (getRandomInt(4)) {
                case 0:
                    return (p.tetriT());
                    break;
                case 1:
                    return (p.tetriT2());
                    break;
                case 2:
                    return (p.tetriT3());
                    break;
                case 3:
                    return (p.tetriT4());
                    break;
                default:
                    p.tetriT()
                    break;
            }
            break
        default:
            break;
    }

}

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

export class pieces {
    constructor() {
        this.piece = randPiece();
        this.next = undefined;
    }

    addNewMallion() {
        this.next = new pieces;
    }
}

export function getPieces() {
    //var c = new pieces;
    return (randPiece())
}

function okForFall(grid) {
    if (!grid)
        return (false)
    let x = 19
    let ret = true
    let c = 0
    while (x >= 0) {
        let y = 9
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

function creatSpeactre(room) {
    let c = "P"
    for (let i in room.players) {
        let save = []
        let x = 19
        while (x >= 0) {
            let y = 9
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
        while (okForFall(room.players[i].grid)) {
            x = 19
            while (x >= 0) {
                y = 9
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

        x = 19
        while (x >= 0) {
            y = 9
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

export function fall_piece(room, id) {
    let i = 0
    for (i in room.players) {
        if (room.players[i].socketID == id) {
            if (room.players[i].loose)
                return (room);
            if (okForFall(room.players[i].grid)) {
                room.players[i].hit = false
                let x = 19
                while (x >= 0) {
                    let y = 9
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
                let x = 19
                while (x >= 0) {
                    let y = 9
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
        }
    }
    room = creatSpeactre(room)
    return (room)
}

export function floorPiece(room, id) {
    let players = undefined
    clearInterval(room.stop)
    for (let i in room.players) {
        if (room.players[i].loose)
            continue;
        if (room.players[i].socketID == id) {
            while (okForFall(room.players[i].grid)) {
                let x = 19
                while (x >= 0) {
                    let y = 9
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
            room.players[i].hit = false
            let x = 19
            while (x >= 0) {
                let y = 9
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
            break
        }
    }
    room = creatSpeactre(room)
    return (room)
}

export function featherDrop(room, id) {
    let players = undefined
    clearInterval(room.stop)
    for (let i in room.players) {
        if (room.players[i].loose)
            continue;
        if (room.players[i].socketID == id) {
            if (okForFall(room.players[i].grid)) {
                let x = 19
                while (x >= 0) {
                    let y = 9
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
                let x = 19
                while (x >= 0) {
                    let y = 9
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

function okForMoveLeft(grid) {
    let x = 19
    let ret = true
    while (x >= 0) {
        let y = 9
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
        if (room.players[i].socketID == id && okForMoveLeft(room.players[i].grid)) {
            let x = 0
            while (x < 20) {
                let y = 0
                while (y < 10) {
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

function okForMoveRight(grid) {
    let x = 19
    let ret = true
    while (x >= 0) {
        let y = 9
        while (y >= 0) {
            if (grid[x][y][0] == "P" && (grid[x][y + 1] == undefined || (grid[x][y + 1] && grid[x][y + 1] != "." && grid[x][y + 1] != "S" && grid[x][y + 1][0] != "P")))
                return false
            y -= 1
        }
        x -= 1
    }
    return ret
}

export function moveRight(room, id) {
    for (let i in room.players) {
        if (room.players[i].loose)
            continue;
        if (room.players[i].socketID == id && okForMoveRight(room.players[i].grid)) {
            let x = 0
            while (x < 20) {
                let y = 9
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


export function resetParty(room) {
    for (let i in room.players) {
        room.players[i].loose = false
        room.players[i].grid = [[".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."]]
    }
    return room
}
