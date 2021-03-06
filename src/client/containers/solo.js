import React from 'react'
import SpectreSolo from './spectreSolo'
import Makebord from '../components/makebord'
import { BrowserRouter as Router, Switch, Route, Link, withRouter, HashRouter } from "react-router-dom";
import { removePlayerFromRoom } from "../actions/server"
import { dataChangeHome, dataChargeLobby, generique_dispatch_no_param } from "../actions/"
import MakeNewPiece from './makeMewPiece'
import { connect } from 'react-redux';
import { func } from 'prop-types';
import { getPlayer } from '../reducers/reducer'
import { store } from '../middleware/storeStateMiddleWare'

function getGoodRoom(room, state) {
    for (let i in room) {
        for (let j in room[i].players) {
            console.log()
            if (room[i].players[j].socketID == state.socketID)
                return (room[i])
        }
    }
}

function chooseWin(room, id) {
    for (let i in room.players) {
        if (room.players[i].socketID != id && room.players[i].loose == false)
            return ("you loose")
    }
    return ("you win")
}

function MakeOverlay({ golobby, goHome }) {
    let state = store.getState()
    let room = state.room
    if (state.loose && !state.spec) {
        return ([<div className={state.room.rules[1] ? "mini_custom_overlay" : "overlay"} key="1">
        </div>,
        <div className="custom_overlay" key="2">
            <p>{chooseWin(room, state.socketID)}</p>
            <a id="return-menu" className="btn" onClick={room && room.priv == false ? golobby : goHome}> {room && room.priv == false ? "back to lobby" : "Back to menu"}</a>
        </div>])
    }
    else {
        return (<div></div>)
    }
}

function Solo({ onClickt, pageHome, state, boucle, golobby, goHome }) {
    var name = []
    let player = getPlayer(state.room, state)
    return (
        <Router>
            <div id="container-party-solo">
                <div className="content-bord-solo">
                    <div id={state.room.rules[1] ? "minibord" : "bord"}>
                        <Makebord state={state} />
                        <MakeOverlay state={state} golobby={golobby} goHome={goHome} />
                    </div>
                </div>
                <aside id="info-party-solo">
                    <div id="next-piece-container">
                        <div id="solo-next-piece">
                            <MakeNewPiece piece={state.piece} />
                        </div>
                    </div>
                    {state.room.rules[2] ? <p>Your Score : {player.score} </p> : <p></p>}
                    <img id="title-img" src="./assets/images/title.png"></img>
                    <div id="container-spectre-solo">

                        <SpectreSolo state={state} />

                    </div>
                    <Link id="return-menu" className="btn" to="/" onClick={() => pageHome(state)}>Back to Menu</Link>
                </aside>

            </div>
        </Router>
    )
}

Solo.propTypes = {
    onClickt: func
};

const mapStateToProps = (state, ownProps) => ({
    state: state
})
//server/removePlayerFromRoom
const mapDispatchToProps = (dispatch) => ({
    dispatch: dispatch,
    pageHome: (state) => {
        clearInterval(state.inter)
        dispatch(generique_dispatch_no_param(dispatch, dataChangeHome))
        dispatch(removePlayerFromRoom(state))
    },
    golobby: generique_dispatch_no_param(dispatch, dataChargeLobby),
    goHome: generique_dispatch_no_param(dispatch, dataChangeHome),
})
export default connect(mapStateToProps, mapDispatchToProps)(Solo)
