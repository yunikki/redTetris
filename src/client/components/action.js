import { dataChangeHome, dataChangeSolo, dataChangeInputName, dataChangeInputNameRoom, dataChargeLobby, saveResearch } from '../actions'
import { dataPiecesSolo, searchRooms } from '../actions/server'

export function dipatcherOnNewPiece(dispatch) {
    return () => dispatch(dataPiecesSolo());
}

export function chargePageHome(dispatch) {
    return () => dispatch(dataChangeHome());
}

export function chargePageSolo(dispatch) {
    return () => dispatch(dataChangeSolo());
}

// inputYourName(dispatch, dataChangeInputName)
export function inputYourName(dispatch/*, generateAction*/) {
    return (e) => { dispatch(dataChangeInputName(e.target.value)) };
}


export function inputYourNameRoom(dispatch/*, generateAction*/) {
    return (e) => { dispatch(dataChangeInputNameRoom(e.target.value)) };
}

export function chargeLobby(dispatch/*, generateAction*/) {
    return () => { dispatch(dataChargeLobby()) };
}

export function saveSearch(dispatch, e) {
    return () => { dispatch(saveResearch(e.target.value)) };
}


export function strRandom(o) {
    var a = 10,
        b = 'abcdefghijklmnopqrstuvwxyz',
        c = '',
        d = 0,
        e = '' + b;
    if (o) {
        if (o.startsWithLowerCase) {
            c = b[Math.floor(Math.random() * b.length)];
            d = 1;
        }
        if (o.length) {
            a = o.length;
        }
        if (o.includeUpperCase) {
            e += b.toUpperCase();
        }
        if (o.includeNumbers) {
            e += '1234567890';
        }
    }
    for (; d < a; d++) {
        c += e[Math.floor(Math.random() * e.length)];
    }
    return c;
}
