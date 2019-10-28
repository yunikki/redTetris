import { dataBoucle } from '../actions/server'
import { store } from '../middleware/storeStateMiddleWare'
import { CHANGE_HOME, CHANGE_SOLO, CHANGE_INPUT_NAME, CHANGE_INPUT_NAME_ROOM, CHARGE_LOBBY, SAVE_SEARCH, NOT_MASTER, DO_MASTER, SET_INTER, KONAMI } from "../actions"

function reducer(state = initialState, action) {
    console.log(action.type)
    switch (action.type) {
        case 'GET_SOCKET':
            return { ...state, socketID: action.socketID };
        case 'newPiece':
            return { ...state, piece: { ...action.piece } };
        case 'joinRoom':
            let v = false
            if (action.room)
                v = action.room.status == "runing" && state.location == "Lobby"
            return {
                ...state,
                sharp: false,
                room: { ...action.room },
                spec: v,
                location: v ? "game" : state.location,
                piece: v ? getPieceWithRoom(action.room, state) : state.piece,
                grid: v ? getGridWithRoom(action.room, state) : state.grid,
                master: v ? false : getIsMaster(action.room, state)
            };
        case 'joinRoomSharp':
            v = false
            if (action.room)
                v = action.room.status == "runing"
            return {
                ...state,
                sharp: false,
                room: { ...action.room },
                spec: v,
                socketID: action.id,
                location: v ? "game" : "Lobby",
                piece: v ? getPieceWithRoom(action.room, state) : state.piece,
                grid: v ? getGridWithRoom(action.room, state) : state.grid,
                master: v ? false : getIsMaster(action.room, state)
            };
        case 'joinRoom_':
            return {
                ...state,
                room: { ...action.room },
                master: action.master == 1 ? true : action.master == 2 ? state.master : false
            };
        case 'searchResult':
            return { ...state, sharp: false, searchResult: { ...action.results } }
        case CHANGE_HOME:
            return { ...state, location: "Home", runRoom: false, inputNameRoom: "", inputName: "", konami: false }
        case CHANGE_SOLO:
            return { ...state, sharp: false, location: "game", piece: undefined }
        case CHARGE_LOBBY:
            return { ...state, sharp: false, location: "Lobby" }
        case NOT_MASTER:
            return { ...state, master: false }
        case DO_MASTER:
            return { ...state, master: true }
        case 'END_GAME':
            console.log("ENDGAME ------------------------", state.room.priv, state.spec)
            return {
                ...state,
                spec: false,
                location: state.room.priv ? state.location : state.spec ? "Lobby" : state.location,
                room: action.room
            }
        case CHANGE_INPUT_NAME:
            return {
                ...state,
                sharp: false,
                inputName: action.data,
                runRoom: action.data != "" && state.inputNameRoom != "",
            }
        case CHANGE_INPUT_NAME_ROOM:
            return {
                ...state,
                inputNameRoom: action.data,
                runRoom: action.data != "" && state.inputName != ""
            }
        case SAVE_SEARCH:
            return {
                ...state,
                nameSearch: action.data
            }
        case 'GAME_START':
            let player = getPlayer(action.room, state)
            if (player.loose) {
                clearInterval(state.inter)
            }
            let t = getLooseWithRoom(action.room, state)
            if (state.loose && state.location == "game")
                t = true

            return {
                ...state,
                konami: (state.master && state.konami) || action.room.rules[4],
                loose: t,
                piece: getPieceWithRoom(action.room, state),
                grid: getGridWithRoom(action.room, state),
                room: action.room
            }
        case 'GAME_START_':
            console.log('test')
            let inter = setInterval(() => {
                store.dispatch(dataBoucle())
            }, state.room.rules[0] ? 500 : 1000);
            return {
                ...state,
                inter: inter,
                location: 'game',
                loose: false,
                spec: false,
                piece: getPieceWithRoom(action.room, state),
                grid: getGridWithRoom(action.room, state),
                room: action.room
            }
        case KONAMI:
            return {
                ...state,
                konami: true
            }
        case SET_INTER:
            return {
                ...state,
                inter: action.data
            }
        default:
            return state;
    }
}

export function getPlayer(room, state) {
    for (let i in room.players) {
        if (room.players[i].socketID == state.socketID) {
            return (room.players[i])
        }
    }
}

function getPieceWithRoom(room, state) {
    for (let i in room.players) {
        if (room.players[i].socketID == state.socketID && !state.spec) {
            if (!room.Pieces[room.players[i].currentPiece + 1] || room.players[i].loose)
                return ([
                    "....",
                    "....",
                    "....",
                    "...."
                ])

            return (room.Pieces[room.players[i].currentPiece + 1].piece)
        }
    }

    for (let i in room.players) {
        if (room.players[i].gameMaster == 1 && state.spec) {
            if (!room.Pieces[room.players[i].currentPiece + 1] || room.players[i].loose)
                return ([
                    "....",
                    "....",
                    "....",
                    "...."
                ])
            return (room.Pieces[room.players[i].currentPiece + 1].piece)
        }
    }
}

function getGridWithRoom(room, state) {
    for (let i in room.players) {
        if (room.players[i].socketID == state.socketID && !state.spec) {
            return (room.players[i].grid)
        }
    }

    for (let i in room.players) {
        if (room.players[i].gameMaster == 1 && state.spec) {
            return (room.players[i].grid)
        }
    }
}

function getIsMaster(room, state) {
    for (let i in room.players) {
        if (room.players[i].socketID == state.socketID) {
            if (room.players[i].gameMaster == 1)
                return (true)
            else
                return false
        }
    }
    return false
}

function getLooseWithRoom(room, state) {
    for (let i in room.players) {
        if (room.players[i].socketID == state.socketID && !state.spec) {
            return (room.players[i].loose)
        }
    }

    for (let i in room.players) {
        if (room.players[i].gameMaster == 1 && state.spec) {
            return (room.players[i].loose)
        }
    }
}

export default { reducer }
