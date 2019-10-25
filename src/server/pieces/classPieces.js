import p from "./piece"
import { destroyLine } from "./destroyLine"
import { okForFall } from "./okForFall"
import { creatSpeactre } from "./creatSpectre"

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
