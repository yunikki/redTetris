import p from "./piece"

export function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function randPiece() {
    switch (getRandomInt(5)) {
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

function randColor() {
    let r = getRandomInt(4)
    switch (r) {
        case 0:
            return ('PR');
        case 1:
            return ('PG');
        case 2:
            return ('PB');
        case 3:
            return ('PO');
        case 4:
            return ('PV');

        default:
            break;
    }
}

export function setNewPieceInGridForAll(room) {
    let p = epurPiece(room.Pieces[0].piece)
    let c = randColor()
    for (let i in room.players) {
        for (let l in p) {
            let l_grid = 3;
            let l_piece = 0
            while (l_piece < 4) {
                if (p[l][l_piece] == "#")
                    room.players[i].grid[l][l_grid] = c
                l_grid += 1;
                l_piece += 1
            }
        }
    }
    return room
}

export function setNewPieceInGrid(player, piece) {
    let p = epurPiece(piece)
    let c = randColor()

    for (let l in p) {
        let l_grid = 3;
        let l_piece = 0
        while (l_piece < 4) {
            if (player.grid[l][l_grid] != ".") {
                player.loose = true
                return player
            }
            else if (p[l][l_piece] == "#")
                player.grid[l][l_grid] = c
            l_grid += 1;
            l_piece += 1
        }
    }

    return player
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
