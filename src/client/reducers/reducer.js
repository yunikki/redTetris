import { ALERT_POP } from '../actions/alert'
import { createStore, applyMiddleware } from 'redux';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';


let socket = io('http://localhost:3004');
let socketIoMiddleware = createSocketIoMiddleware(socket, "server/");

function reducer(state = {}, action) {
    console.log('ici   --->', action)
    switch (action.type) {
        case 'pong':
            return Object.assign({}, { message: "oui" });
        default:
            return state;
    }
}

var store = applyMiddleware(socketIoMiddleware)(createStore)(reducer);

export default { store, reducer }
