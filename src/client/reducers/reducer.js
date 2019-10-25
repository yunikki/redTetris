import { createStore, applyMiddleware } from 'redux';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';
import React from 'react'
import ReactDOM from 'react-dom';
import App from '../containers/app.js';
import { dataBoucle } from '../actions/server'
import { store } from '../index'

function reducer(state = initialState, action) {
    console.log(action.type)
    switch (action.type) {
        case 'pong':
            return Object.assign({}, { message: "oui" });
        case 'newPiece':
            return { ...state, piece: { ...action.piece } };
        case 'joinRoom':
            let v = false
            console.log("JOINROOM ------------------------")
            if (action.room)
                v = action.room.status == "runing"
            return {
                ...state,
                room: { ...action.room },
                spec: v,
                location: v ? "game" : state.location,
                piece: v ? getPieceWithRoom(action.room, state) : state.piece,
                grid: v ? getGridWithRoom(action.room, state) : state.grid,
                master: action.master == 1 ? true : action.master == 2 ? state.master : false
            };
        case 'joinRoom_':
            return {
                ...state,
                room: { ...action.room },
                master: action.master == 1 ? true : action.master == 2 ? state.master : false
            };
        case 'searchResult':
            return { ...state, searchResult: { ...action.results } }
        case 'chargeHome':
            return { ...state, location: "Home", runRoom: false, inputNameRoom: "", inputName: "", konami: false }
        case 'chargeSolo':
            return { ...state, location: "game", piece: undefined }
        case 'CHARGE_LOBBY':
            return { ...state, location: "Lobby" }
        case 'NOT_MASTER':
            return { ...state, master: false }
        case 'DO_MASTER':
            return { ...state, master: true }
        case 'END_GAME':
            console.log("ENDGAME ------------------------")
            return {
                ...state,
                spec: false,
                location: state.room.priv ? state.location : state.spec ? "Lobby" : state.location,
                room: action.room
            }
        case 'CHANGE_INPUT_NAME':
            return {
                ...state,
                inputName: action.data,
                runRoom: action.data != "" && state.inputNameRoom != "",
            }
        case 'CHANGE_INPUT_NAME_ROOM':
            return {
                ...state,
                inputNameRoom: action.data,
                runRoom: action.data != "" && state.inputName != ""
            }
        case 'SAVE_SEARCH':
            return {
                ...state,
                nameSearch: action.data
            }
        case 'GAME_START':
            let player = getPlayer(action.room, state)
            if (player.loose) {
                clearInterval(state.inter)
            }
            return {
                ...state,
                konami: state.master || action.room.rules[4],
                loose: player.loose,
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
        case 'KONAMI':
            return {
                ...state,
                konami: true
            }
        case 'SET_INTER':
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
            if (!room.Pieces[room.players[i].currentPiece + 1])
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
            if (!room.Pieces[room.players[i].currentPiece + 1])
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

export default { reducer }
