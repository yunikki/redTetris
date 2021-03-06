import { store } from '../middleware/storeStateMiddleWare'

export const SERVEUR_PIECESSOLO = 'server/piecesSolo'
export const SERVEUR_CREAT_ROOM = 'server/creatRoom'
export const SERVEUR_CREAT_ROOM_SHARP = 'server/creatRoomSharp'
export const SERVER_SEARCH_ROOM = 'server/searchRoom'
export const REMOVE_PLAYER_FROM_ROOM = 'server/removePlayerFromRoom'
export const GAME_START = 'server/gameStart'
export const SERVER_KEY_UP = 'server/keyUp'
export const SERVER_KEY_DOWN = 'server/keyDown'
export const SERVER_KEY_LEFT = 'server/keyleft'
export const SERVER_KEY_RIGHT = 'server/keyRight'
export const CHANGE_PARAM_ROOM = 'server/changeParamRoom'
export const SERVER_KEY_SPACE = 'server/keySpace'
export const SERVER_BOUCLE = "server/boucle"

export const dataPiecesSolo = () => {
    return {
        type: SERVEUR_PIECESSOLO
    }
}

export const dataChangeParamRoom = (val, id, name) => {
    return {
        type: CHANGE_PARAM_ROOM,
        val: val,
        id: id,
        name: name
    }
}

export const dataCreateRoom = (state) => {
    return {
        type: SERVEUR_CREAT_ROOM,
        roomName: state.inputNameRoom,
        playerName: state.inputName,
        socketID: state.socketID,
        priv: false,
    }
}

export const dataCreateRoomSharp = (state) => {
    return {
        type: SERVEUR_CREAT_ROOM_SHARP,
        roomName: state.inputNameRoom,
        playerName: state.inputName,
        socketID: state.socketID,
        priv: false,
    }
}

export const dataCreateRoomSolo = (state, str) => {

    return {
        type: SERVEUR_CREAT_ROOM,
        roomName: str,
        playerName: str,
        socketID: state.socketID,
        priv: true
    }
}

export const dataCreateRoom_bis = (state, nameRoom) => {
    return {
        type: SERVEUR_CREAT_ROOM,
        roomName: nameRoom,
        playerName: state.inputName,
        socketID: state.socketID,
        priv: false,
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
        playerName: state.socketID
    }
}

export const startGame = (state) => {
    return {
        type: GAME_START,
        playerName: state.socketID
    }
}

export const DataKeyUp = (name) => {
    return {
        type: SERVER_KEY_UP,
        name: name
    }
}

export const DataKeyDown = (name) => {
    return {
        type: SERVER_KEY_DOWN,
        name: name
    }
}

export const DataKeyLeft = (name) => {
    return {
        type: SERVER_KEY_LEFT,
        name: name
    }
}

export const DataKeyRight = (name) => {
    return {
        type: SERVER_KEY_RIGHT,
        name: name
    }
}

export const DataKeySpace = (name) => {
    return {
        type: SERVER_KEY_SPACE,
        name: name
    }
}

export const dataBoucle = () => {
    let state = store.getState()
    return {
        type: SERVER_BOUCLE,
        name: state.socketID,
        id: state.socketID
    }
}
