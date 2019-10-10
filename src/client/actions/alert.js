export const ALERT_POP = 'ALERT_POP'
export const NEXT_PIECE = 'NEXT_PIECE'
export const UPDATE_INPUT = 'UPDATE_INPUT'

export const alert = (message) => {
    return {
        type: ALERT_POP,
        message
    }
}

export const UpdateInput = (message) => {
    return {
        type: UPDATE_INPUT,
        message
    }
}

export const needPiece = (message) => {
    return {
        type: NEXT_PIECE
    }
}
