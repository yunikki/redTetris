import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link, withRouter, HashRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { OptionRoom, NameEnnemy } from '../components/optionRoom'
import { removePlayerFromRoom, startGame } from '../actions/server'
import { dataChangeHome, dataChangeSolo, generique_dispatch_no_param } from '../actions'


function getGoodRoom(room, state) {
    for (let i in room) {
        for (let j in room[i].players) {
            if (room[i].players[j].socketID == state.socketID)
                return (room[i])
        }
    }
}

function ButtonStartGame({ room, state, chargeGame }) {
    let r = getGoodRoom(r, state)
    if (!room || room.status == "runing")
        return <div></div>
    return (
        <div style={{ display: state.master ? "inline-block" : "none" }} id="button-1player" className="btn" onClick={() => chargeGame(state)}>start the game</div>
    )
}

function Lobby({ chargeGame, leaveLobby, state, room, dispatch }) {
    if (state.location && state.location == 'game')
        dispatch(generique_dispatch_no_param(dispatch, dataChangeSolo))
    return (
        <Router>
            <div id="menu">
                <div id="container-title">
                    <img id="title-img" src="./assets/images/title.png"></img>
                </div>
                <div id="menu-panel">
                    <h2 > {state.master ? "you are the master" : "you are note the master"}</h2>
                    <h3>players:</h3>
                    <p className="list_name_lobby">you: ({state.inputName})</p>
                    <NameEnnemy state={state} />
                    <h3>mode enabel:</h3>
                    <OptionRoom state={state} dispatch={dispatch} room={room} />
                    <div id="container-selec-quick">
                        <Link id="button-2player" className="btn" to="/" onClick={() => leaveLobby(state)}>leave the room</Link>
                        <ButtonStartGame room={room} state={state} chargeGame={chargeGame} />
                    </div>
                </div>

            </div>
        </Router>

    )
}

const mapStateToProps = (state, ownProps) => ({
    state: state,
    room: state.room
})

const mapDispatchToProps = (dispatch) => {
    return ({
        dispatch: dispatch,
        chargeGame: (state) => {
            dispatch(startGame(state))
        },
        leaveLobby: (state) => {
            dispatch(removePlayerFromRoom(state))
            dispatch(generique_dispatch_no_param(dispatch, dataChangeHome))
        }
    });
}
export default connect(mapStateToProps, mapDispatchToProps)(Lobby)
