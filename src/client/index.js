import React from 'react';
import ReactDOM from 'react-dom';
// import { createStore, applyMiddleware } from 'redux';
// import { createLogger } from 'redux-logger';
// import thunk from 'redux-thunk';
import App from './containers/app.js';
import './index.css'
// import { storeStateMiddleWare } from './middleware/storeStateMiddleWare'
import reducer from './reducers'
// import { alert } from './actions/alert'



// const initialState = {}

// const store = createStore(
//     reducer,
//     initialState,
//     applyMiddleware(thunk, createLogger())
// )


ReactDOM.render(

    <App test='test' />,
    document.getElementById('app')
)


// store.dispatch(alert('Soon, will be here a fantastic Tetris ...'))
