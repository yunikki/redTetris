import { store } from '../index'

export const SERVEUR_PIECESSOLO = 'server/piecesSolo'
export const SERVEUR_CREAT_ROOM = 'server/creatRoom'
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
        playerName: state.inputName
    }
}

export const startGame = (state) => {
    return {
        type: GAME_START,
        playerName: state.inputName
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
        name: state.inputName,
        id: state.socketID
    }
}

export const data_konami = () => {
    return {
        type: "KONAMI",
    }
}

//[38,38,40,40,37,39,37,39,66,65,66,65]
var tab_konami = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

function isKonmai(t) {
    if (t[0] != 38)
        return false
    if (t[1] != 38)
        return false
    if (t[2] != 40)
        return false
    if (t[3] != 40)
        return false
    if (t[4] != 37)
        return false
    if (t[5] != 39)
        return false
    if (t[6] != 37)
        return false
    if (t[7] != 39)
        return false
    if (t[8] != 66)
        return false
    if (t[9] != 65)
        return false
    return true
}

export function keyTetris(e, dispatch, state) {
    if (state.location == "Lobby") {
        tab_konami.push(e.keyCode)
        tab_konami.shift()
        console.log(tab_konami == [38, 38, 40, 40, 37, 39, 37, 39, 66, 65])
        if (isKonmai(tab_konami)) {
            console.log('oui')
            dispatch(data_konami())
        }

    }
    else
        tab_konami = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]


    if (state.location == "game" && (e.key == 'w' || e.key == 'ArrowUp'))
        dispatch(DataKeyUp(state.inputName))
    else if (state.location == "game" && (e.key == 's' || e.key == 'ArrowDown'))
        dispatch(DataKeyDown(state.inputName))
    else if (state.location == "game" && (e.key == 'a' || e.key == 'ArrowLeft'))
        dispatch(DataKeyLeft(state.inputName))
    else if (state.location == "game" && (e.key == 'd' || e.key == 'ArrowRight'))
        dispatch(DataKeyRight(state.inputName))
    else if (state.location == "game" && (e.key == ' '))
        dispatch(DataKeySpace(state.inputName))
}
