import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import App from './containers/app.js';
import './index.css'
import { keyTetris } from './actions/key'
import { store } from "./middleware/storeStateMiddleWare"


ReactDOM.render(
    <Provider store={store}><App test='test' /></Provider>,
    document.getElementById('app')
)

window.addEventListener('keydown', function (e) {
    keyTetris(e, store.dispatch, store.getState())
})
