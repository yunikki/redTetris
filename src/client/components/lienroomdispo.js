import React from 'react'
import reducer from '../reducers'
import { connect } from 'react-redux';
import { dataChargeLobby, dataChangeInputNameRoom } from '../actions'
import { dataCreateRoom_bis } from '../actions/server'

function join(state, dispatch, e) {
    dispatch(dataCreateRoom_bis(state, e.target.getAttribute('roomname')))
    dispatch(dataChargeLobby())
}

export function FormatLine({ state, dispatch }) {
    var ret = []

    for (var i in state.searchResult) {
        ret.push(<div className="line-room" key={i}>
            <div className="name-list">{state.searchResult[i].roomName}</div>
            <div className="creat-list">{state.searchResult[i].gameMaster}</div>
            <div className="player-list">{state.searchResult[i].players}</div>
            <div className="join-list" roomname={state.searchResult[i].roomName} onClick={(e) => join(state, dispatch, e)}>join</div>
        </div>)
    }
    return (ret)
}
