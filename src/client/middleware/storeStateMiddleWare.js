import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import reducer from '../reducers/reducer'
import thunk from 'redux-thunk';

let socket = io('http://localhost:3004');

const initialState = {
    inputName: "",
    inputNameRoom: "",
    runRoom: false,
    location: "Home",
    master: false,
    socketID: "",
    searchResult: {},
    konami: false
}

socket.on('connect', function () {
    initialState.socketID = socket.id;
})

let socketIoMiddleware = createSocketIoMiddleware(socket, "server/");

export const store = createStore(
    reducer.reducer,
    initialState,
    applyMiddleware(
        thunk,
        socketIoMiddleware,
        createLogger()
    )
)
