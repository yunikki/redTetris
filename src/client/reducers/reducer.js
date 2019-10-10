import { ALERT_POP } from '../actions/alert'
import { createStore, applyMiddleware } from 'redux';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';
import React from 'react'
import ReactDOM from 'react-dom';
import App from '../containers/app.js';


const initialState = {
    lapin: "gros"
}

function reducer(state = initialState, action) {
    console.log('ici   --->', action)
    switch (action.type) {
        case 'pong':
            return Object.assign({}, { message: "oui" });
        case 'newPiece':
            return { ...state, piece: { ...action.piece } };
        case 'chargeHome':
            return { ...state, location: "Home" }
        case 'chargeSolo':
            return { ...state, location: "Solo" }
        default:
            return state;
    }
}

export default { reducer }
