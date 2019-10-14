import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import App from './containers/app.js';
import './index.css'
// import { storeStateMiddleWare } from './middleware/storeStateMiddleWare'
import reducer from './reducers'
// import { alert } from './actions/alert'

import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';

const initialState = {
    inputName: "",
    inputNameRoom: "",
    runRoom: false,
    location: "Home"
}
let socket = io('http://localhost:3004');
let socketIoMiddleware = createSocketIoMiddleware(socket, "server/");
// var store = applyMiddleware(socketIoMiddleware)(createStore)(reducer);

const store = createStore(
    reducer.reducer,
    initialState,
    applyMiddleware(
        thunk,
        socketIoMiddleware,
        createLogger()
    )
)


ReactDOM.render(

    <Provider store={store}><App test='test' /></Provider>,
    document.getElementById('app')
)


// store.dispatch(alert('Soon, will be here a fantastic Tetris ...'))
