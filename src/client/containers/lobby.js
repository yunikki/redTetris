import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link, withRouter, HashRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { chargePageSolo, chargePageHome } from '../components/action'
import { OptionRoom, NameEnnemy } from '../components/optionRoom'
import { removePlayerFromRoom, startGame } from '../actions/server'

function Lobby({ chargeGame, leaveLobby, state, room, dispatch }) {
    if (state.location && state.location == 'game')
        dispatch(chargePageSolo(dispatch))
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
                    <OptionRoom state={state} dispatch={dispatch} />
                    <div id="container-selec-quick">
                        <Link id="button-2player" className="btn" to="/" onClick={() => leaveLobby(state)}>leave the room</Link>
                        <Link style={{ display: state.master ? "inline-block" : "none" }} id="button-1player" className="btn" to="/solo" onClick={() => chargeGame(state)}>start the game</Link>
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
            //dispatch(chargePageSolo(dispatch)),
            dispatch(startGame(state))
        },
        pageSolo: chargePageSolo(dispatch),
        leaveLobby: (state) => {
            dispatch(removePlayerFromRoom(state))
            dispatch(chargePageHome(dispatch))
        }
    });
}
export default connect(mapStateToProps, mapDispatchToProps)(Lobby)
