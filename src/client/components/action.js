import { dataChangeHome, dataChangeSolo, dataChangeInputName, dataChangeInputNameRoom, dataChargeLobby , saveResearch} from '../actions'
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

export function saveSearch(dispatch) {
    return (e) => {dispatch(saveResearch(e.target.value))};
}
