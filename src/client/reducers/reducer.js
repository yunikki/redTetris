import { ALERT_POP } from '../actions/alert'
import { createStore, applyMiddleware } from 'redux';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';
import React from 'react'
import ReactDOM from 'react-dom';


let socket = io('http://localhost:3004');
let socketIoMiddleware = createSocketIoMiddleware(socket, "server/");

function reducer(state = {}, action) {
    console.log('ici   --->', action)
    switch (action.type) {
        case 'pong':
            return Object.assign({}, { message: "oui" });
        case 'newPiece':
            return affNewPiece(action.piece);
        default:
            return state;
    }
}

function affNewPiece(piece) {
    var div = document.getElementsByClassName("caseNewPiece")
    var x = 0;
    var countDiv = 0;
    console.log(div)
    while (x < 4) {
        var y = 0;
        while (y < 4) {
            div[countDiv].style.backgroundColor = "#505050"
            if (piece[y][x] == '#')
                div[countDiv].style.backgroundColor = "red"
            //console.log(piece[y][x])
            y += 1;
            countDiv += 1
        }
        x += 1;
    }
}

var store = applyMiddleware(socketIoMiddleware)(createStore)(reducer);

export default { store, reducer }
