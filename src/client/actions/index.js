export const ALERT_POP = 'ALERT_POP'
export const NEXT_PIECE = 'NEXT_PIECE'
export const UPDATE_INPUT = 'UPDATE_INPUT'
export const CHANGE_HOME = 'chargeHome'
export const CHANGE_SOLO = 'chargeSolo'
export const CHANGE_INPUT_NAME = 'CHANGE_INPUT_NAME'
export const CHANGE_INPUT_NAME_ROOM = 'CHANGE_INPUT_NAME_ROOM'
export const CHARGE_LOBBY = 'CHARGE_LOBBY'
export const SAVE_SEARCH = 'SAVE_SEARCH'
export const NOT_MASTER = 'NOT_MASTER'
export const DO_MASTER = 'DO_MASTER'

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
