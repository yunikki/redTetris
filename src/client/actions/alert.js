export const ALERT_POP = 'ALERT_POP'
export const NEXT_PIECE = 'NEXT_PIECE'

export const alert = (message) => {
    return {
        type: ALERT_POP,
        message
    }
}

export const needPiece = (message) => {
    return {
        type: NEXT_PIECE
    }
}
