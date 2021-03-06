export const CHANGE_HOME = 'chargeHome'
export const CHANGE_SOLO = 'chargeSolo'
export const CHANGE_INPUT_NAME = 'CHANGE_INPUT_NAME'
export const CHANGE_INPUT_NAME_ROOM = 'CHANGE_INPUT_NAME_ROOM'
export const CHARGE_LOBBY = 'CHARGE_LOBBY'
export const SAVE_SEARCH = 'SAVE_SEARCH'
export const NOT_MASTER = 'NOT_MASTER'
export const DO_MASTER = 'DO_MASTER'
export const SET_INTER = 'SET_INTER'
export const KONAMI = "KONAMI"

export const dataChangeHome = () => {
    return {
        type: CHANGE_HOME,
    }
}
export const dataTMaster = () => {
    return {
        type: DO_MASTER,
    }
}

export const dataNotMaster = () => {
    return {
        type: NOT_MASTER,
    }
}

export const dataChangeSolo = () => {
    return {
        type: CHANGE_SOLO,
    }
}

export const dataChargeLobby = () => {
    return {
        type: CHARGE_LOBBY,
    }
}

export const dataChangeInputName = (val) => {
    return {
        type: CHANGE_INPUT_NAME,
        data: val
    }
}

export const dataChangeInputNameRoom = (val) => {
    return {
        type: CHANGE_INPUT_NAME_ROOM,
        data: val
    }
}

export const saveResearch = (val) => {
    return {
        type: SAVE_SEARCH,
        data: val
    }
}

export const dataLoadInter = (inter) => {
    return {
        type: SET_INTER,
        data: inter
    }
}

export const data_konami = () => {
    return {
        type: KONAMI,
    }
}

export function generique_dispatch_no_param(dispatch, f, e) {
    return () => { dispatch(f(e)) }
}
