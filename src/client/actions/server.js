export const SERVEUR_PIECESSOLO = 'server/piecesSolo'
export const SERVEUR_CREAT_ROOM = 'server/creatRoom'
export const SERVER_SEARCH_ROOM = 'server/searchRoom'
export const REMOVE_PLAYER_FROM_ROOM = 'server/removePlayerFromRoom'

export const SERVER_KEY_UP = 'server/keyUp'
export const SERVER_KEY_DOWN = 'server/keyDown'
export const SERVER_KEY_LEFT = 'server/keyleft'
export const SERVER_KEY_RIGHT = 'server/keyRight'

export const dataPiecesSolo = () => {
    return {
        type: SERVEUR_PIECESSOLO
    }
}
export const dataCreateRoom = (state) => {
    return {
        type: SERVEUR_CREAT_ROOM,
        roomName: state.inputNameRoom,
        playerName: state.inputName,
        socketID: state.socketID
    }
}

export const dataCreateRoom_bis = (state, nameRoom) => {
    return {
        type: SERVEUR_CREAT_ROOM,
        roomName: nameRoom,
        playerName: state.inputName,
        socketID: state.socketID
    }
}

export const getRoomInfos = () => {
    return {
        type: SERVER_SEARCH_ROOM
    }
}

export const removePlayerFromRoom = (state) => {
    return {
        type: REMOVE_PLAYER_FROM_ROOM,
        playerName: state.inputName
    }
}
export const DataKeyUp = () => {
    return {
        type: SERVER_KEY_UP
    }
}

export const DataKeyDown = () => {
    return {
        type: SERVER_KEY_DOWN
    }
}

export const DataKeyLeft = () => {
    return {
        type: SERVER_KEY_LEFT
    }
}

export const DataKeyRight = () => {
    return {
        type: SERVER_KEY_RIGHT
    }
}


export function keyTetris(e, dispatch, state) {
    console.log(e.key)
    if (state.location == "Solo" && (e.key == 'w' || e.key == 'ArrowUp'))
        dispatch(DataKeyUp())
    else if (state.location == "Solo" && (e.key == 's' || e.key == 'ArrowDown'))
        dispatch(DataKeyDown())
    else if (state.location == "Solo" && (e.key == 'a' || e.key == 'ArrowLeft'))
        dispatch(DataKeyLeft())
    else if (state.location == "Solo" && (e.key == 'd' || e.key == 'ArrowRight'))
        dispatch(DataKeyRight())
}
