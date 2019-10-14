import { createStore, applyMiddleware } from 'redux';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';
import React from 'react'
import ReactDOM from 'react-dom';
import App from '../containers/app.js';

function reducer(state = initialState, action) {
    switch (action.type) {
        case 'pong':
            return Object.assign({}, { message: "oui" });
        case 'newPiece':
            return { ...state, piece: { ...action.piece } };
        case 'chargeHome':
            return { ...state, location: "Home" }
        case 'chargeSolo':
            return { ...state, location: "Solo" }
        case 'CHANGE_INPUT_NAME':
            return { ...state, inputName: action.data, runRoom: action.data != "" && state.inputNameRoom != "" }
        case 'CHANGE_INPUT_NAME_ROOM':
            return { ...state, inputNameRoom: action.data, runRoom: action.data != "" && state.inputName != "" }
        default:
            return state;
    }
}

export default { reducer }
