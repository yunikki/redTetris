export const ALERT_POP = 'ALERT_POP'
export const NEXT_PIECE = 'NEXT_PIECE'
export const UPDATE_INPUT = 'UPDATE_INPUT'
export const CHANGE_HOME = 'chargeHome'
export const CHANGE_SOLO = 'chargeSolo'
export const CHANGE_INPUT_NAME = 'CHANGE_INPUT_NAME'
export const CHANGE_INPUT_NAME_ROOM = 'CHANGE_INPUT_NAME_ROOM'

export const dataChangeHome = () => {
    return {
        type: CHANGE_HOME,
    }
}

export const dataChangeSolo = () => {
    return {
        type: CHANGE_SOLO,
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
