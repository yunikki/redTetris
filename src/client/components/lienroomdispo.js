import React from 'react'
import reducer from '../reducers'
import { connect } from 'react-redux';
import { dataChargeLobby, dataNotMaster } from '../actions'
import { dataCreateRoom_bis } from '../actions/server'
import { BrowserRouter as Router, Switch, Route, Link, withRouter, HashRouter } from "react-router-dom";


function join(state, dispatch, e) {
    dispatch(dataCreateRoom_bis(state, e.target.getAttribute('roomname')))
    dispatch(dataNotMaster(state, e.target.getAttribute('roomname')))
    dispatch(dataChargeLobby())
}

export function FormatLine({ state, dispatch }) {
    var ret = []

    for (var i in state.searchResult) {
        ret.push(
            <div key={i + 1}>
                <Router >
                    <div className="line-room" >
                        <div className="name-list">{state.searchResult[i].roomName}</div>
                        <div className="creat-list">{state.searchResult[i].gameMaster}</div>
                        <div className="player-list">{state.searchResult[i].players}</div>
                        <Link className="join-list" to={"/#" + state.searchResult[i].roomName + '[' + state.inputName + ']'} roomname={state.searchResult[i].roomName} onClick={(e) => join(state, dispatch, e)} >join</Link>
                    </div>
                </Router>
            </div>
        )
    }
    return (ret)
}
