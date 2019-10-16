import { createStore, applyMiddleware } from 'redux';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';
import React from 'react'
import ReactDOM from 'react-dom';
import App from '../containers/app.js';

function reducer(state = initialState, action) {
    console.log(action.type)
    switch (action.type) {
        case 'pong':
            return Object.assign({}, { message: "oui" });
        case 'newPiece':
            return { ...state, piece: { ...action.piece } };
        case 'joinRoom':
            return {...state, room: {...action.room } };
        case 'searchResult':
            return {...state, searchResult: {...action.results}}
        case 'chargeHome':
            return { ...state, location: "Home", runRoom: false, inputNameRoom: "", inputName: "" }
        case 'chargeSolo':
            return { ...state, location: "Solo", piece: undefined }
        case 'CHARGE_LOBBY':
            return { ...state, location: "Lobby", master: true }
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
        default:
            return state;
    }
}

export default { reducer }
