import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { createStore, applyMiddleware } from 'redux'
import App from './containers/app.js';



const initialState = {

}

// const store = createStore()


ReactDOM.render(

    <App test='test' />,
    document.getElementById('app')
)
