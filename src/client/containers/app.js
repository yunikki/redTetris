import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link, withRouter, HashRouter } from "react-router-dom";
import Home from './home'
import Solo from './solo'
import Lobby from './lobby'
import { connect } from 'react-redux';
import { dataChangeInputName, dataChangeInputNameRoom } from "../actions"
import { dataCreateRoomSharp } from "../actions/server"


function checkUrl(str) {
    return (str.match(/\#[a-zA-Z0-9]+\[[a-zA-Z0-9]+\]/))

}

function App({ state, dispatch }) {
    if (state.location == "Home") {
        if (state.sharp && window.location.hash && checkUrl(window.location.hash)) {
            console.log(window.location)
            let tab = window.location.hash.match(/([A-Za-z0-9])\w+/g)
            dispatch(dataChangeInputName(tab[1]))
            dispatch(dataChangeInputNameRoom(tab[0]))
            state.inputName = tab[1]
            state.inputNameRoom = tab[0]
            console.log(state)
            dispatch(dataCreateRoomSharp(state))

        }


        return <Home />
    }
    else if (state.location == "game") {
        return <Solo />
    }
    else if (state.location == "Lobby")
        return <Lobby />
    else
        return <Home />

}

const mapStateToProps = (state, ownProps) => ({
    state
})
const mapDispatchToProps = (dispatch) => {
    return ({
        dispatch: dispatch,
    });
}

export default connect(mapStateToProps)(App)
