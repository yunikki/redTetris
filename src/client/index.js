// import React from 'react';
// import ReactDOM from 'react-dom';
// import { createStore, applyMiddleware } from 'redux';
// import { createLogger } from 'redux-logger';
// import thunk from 'redux-thunk';
// import App from './containers/app.js';
// import './index.css'
// import { storeStateMiddleWare } from './middleware/storeStateMiddleWare'
// import reducer from './reducers'
// import { alert } from './actions/alert'

import { createStore, applyMiddleware } from 'redux';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';
let socket = io('http://localhost:3004');
let socketIoMiddleware = createSocketIoMiddleware(socket, "server/");
function reducer(state = {}, action) {
    console.log('ici', action)
    switch (action.type) {
        case 'pong':
            return Object.assign({}, { message: action.data });
        default:
            return state;
    }
}
let store = applyMiddleware(socketIoMiddleware)(createStore)(reducer);
store.subscribe(() => {
    console.log('new client state', store.getState());
});
store.dispatch({ type: 'server/ping', data: 'Hello!' });



// const initialState = {}

// const store = createStore(
//     reducer,
//     initialState,
//     applyMiddleware(thunk, createLogger())
// )


// ReactDOM.render(

//     <App test='test' />,
//     document.getElementById('app')
// )


// store.dispatch(alert('Soon, will be here a fantastic Tetris ...'))
