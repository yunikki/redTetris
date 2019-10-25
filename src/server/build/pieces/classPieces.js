"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var piece_1 = __importDefault(require("./piece"));
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
exports.getRandomInt = getRandomInt;
function randPiece() {
    switch (getRandomInt(7)) {
        case 0: //carre
            return (piece_1.default.square());
            break;
        case 1: //L
            switch (getRandomInt(4)) {
                case 0:
                    return (piece_1.default.tetriL());
                    break;
                case 1:
                    return (piece_1.default.tetriL2());
                    break;
                case 2:
                    return (piece_1.default.tetriL3());
                    break;
                case 3:
                    return (piece_1.default.tetriL4());
                    break;
                default:
                    piece_1.default.tetriL();
                    break;
            }
            break;
        case 5: //L
            switch (getRandomInt(4)) {
                case 0:
                    return (piece_1.default.tetriL5());
                    break;
                case 1:
                    return (piece_1.default.tetriL6());
                    break;
                case 2:
                    return (piece_1.default.tetriL7());
                    break;
                case 3:
                    return (piece_1.default.tetriL8());
                    break;
                default:
                    piece_1.default.tetriL();
                    break;
            }
            break;
        case 2:
            switch (getRandomInt(2)) {
                case 0:
                    return (piece_1.default.tetriZ());
                    break;
                case 1:
                    return (piece_1.default.tetriZ2());
                    break;
                default:
                    piece_1.default.tetriZ();
                    break;
            }
            break;
        case 6:
            switch (getRandomInt(2)) {
                case 0:
                    return (piece_1.default.tetriZ3());
                    break;
                case 1:
                    return (piece_1.default.tetriZ4());
                    break;
                default:
                    piece_1.default.tetriZ();
                    break;
            }
            break;
        case 3:
            switch (getRandomInt(2)) {
                case 0:
                    return (piece_1.default.bar());
                    break;
                case 1:
                    return (piece_1.default.bar2());
                    break;
                default:
                    piece_1.default.bar();
                    break;
            }
            break;
        case 4:
            switch (getRandomInt(4)) {
                case 0:
                    return (piece_1.default.tetriT());
                    break;
                case 1:
                    return (piece_1.default.tetriT2());
                    break;
                case 2:
                    return (piece_1.default.tetriT3());
                    break;
                case 3:
                    return (piece_1.default.tetriT4());
                    break;
                default:
                    piece_1.default.tetriT();
                    break;
            }
            break;
        default:
            break;
    }
}
var pieces = /** @class */ (function () {
    function pieces() {
        this.piece = randPiece();
        this.next = undefined;
    }
    pieces.prototype.addNewMallion = function () {
        this.next = new pieces;
    };
    return pieces;
}());
exports.pieces = pieces;
function getPieces() {
    //var c = new pieces;
    return (randPiece());
}
exports.getPieces = getPieces;
