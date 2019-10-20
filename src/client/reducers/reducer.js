import { createStore, applyMiddleware } from 'redux';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';
import React from 'react'
import ReactDOM from 'react-dom';
import App from '../containers/app.js';
import { dataBoucle } from '../actions/server'

function reducer(state = initialState, action) {
    console.log(action.type)
    switch (action.type) {
        case 'pong':
            return Object.assign({}, { message: "oui" });
        case 'newPiece':
            return { ...state, piece: { ...action.piece } };
        case 'joinRoom':
            return { ...state, room: { ...action.room }, master: action.master == 1 ? true : action.master == 2 ? state.master : false };
        case 'searchResult':
            return { ...state, searchResult: { ...action.results } }
        case 'chargeHome':
            return { ...state, location: "Home", runRoom: false, inputNameRoom: "", inputName: "" }
        case 'chargeSolo':
            return { ...state, location: "game", piece: undefined }
        case 'CHARGE_LOBBY':
            return { ...state, location: "Lobby" }
        case 'NOT_MASTER':
            return { ...state, master: false }
        case 'DO_MASTER':
            return { ...state, master: true }
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
            return {
                ...state,
                location: 'game',
                piece: getPieceWithRoom(action.room, state),
                grid: getGridWithRoom(action.room, state),
                room: action.room
            }
        case 'GAME_START_':
            return {
                ...state,
                location: 'game',
                piece: getPieceWithRoom(action.room, state),
                grid: getGridWithRoom(action.room, state),
                room: action.room
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

function getPieceWithRoom(room, state) {
    for (let i in room.players) {
        if (room.players[i].socketID == state.socketID) {
            return (room.Pieces[room.players[i].currentPiece + 1].piece)
        }
    }
}

function getGridWithRoom(room, state) {
    for (let i in room.players) {
        if (room.players[i].socketID == state.socketID) {
            return (room.players[i].grid)
        }
    }
}

export default { reducer }
