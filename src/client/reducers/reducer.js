import { ALERT_POP } from '../actions/alert'
import { createStore, applyMiddleware } from 'redux';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';
import React from 'react'
import ReactDOM from 'react-dom';
import App from '../containers/app.js';


let socket = io('http://localhost:3004');
let socketIoMiddleware = createSocketIoMiddleware(socket, "server/");

function reducer(state = {}, action) {
    console.log('ici   --->', action)
    switch (action.type) {
        case 'pong':
            return Object.assign({}, { message: "oui" });
        case 'newPiece':
            store.piece = action.piece
            ReactDOM.render(<App test='test' />, document.getElementById('app'))
        default:
            return state;
    }
}

var store = applyMiddleware(socketIoMiddleware)(createStore)(reducer);

export default { store, reducer }
