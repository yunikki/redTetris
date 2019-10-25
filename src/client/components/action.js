import { dataChangeHome, dataChangeSolo, dataChangeInputName, dataChangeInputNameRoom, dataChargeLobby, saveResearch } from '../actions'
import { dataPiecesSolo } from '../actions/server'

export function generique_dispatch_no_param(dispatch, f, e) {
    return (e) => { dispatch(f(e)) }
}

// inputYourName(dispatch, dataChangeInputName)
export function inputYourName(dispatch/*, generateAction*/) {
    return (e) => { dispatch(dataChangeInputName(e.target.value)) };
}


export function inputYourNameRoom(dispatch/*, generateAction*/) {
    return (e) => { dispatch(dataChangeInputNameRoom(e.target.value)) };
}

export function saveSearch(dispatch, e) {
    return () => { dispatch(saveResearch(e.target.value)) };
}
