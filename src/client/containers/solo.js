import React from 'react'
import SpectreSolo from './spectreSolo'
import Makebord from '../components/makebord'
import { BrowserRouter as Router, Switch, Route, Link, withRouter, HashRouter } from "react-router-dom";
import { dipatcherOnNewPiece, chargePageHome, chargeLobby } from "../components/action"
import { removePlayerFromRoom, dataBoucle } from "../actions/server"
import { dataChangeHome, dataLoadInter, dataChargeLobby } from "../actions/"
import MakeNewPiece from './makeMewPiece'
import { connect } from 'react-redux';
import { func } from 'prop-types';
import { getPlayer } from '../reducers/reducer'
import { store } from '../index'

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

function rien() {

}


function Solo({ onClickt, pageHome, state, boucle, golobby, goHome }) {
    var name = []
    let player = getPlayer(state.room, state)
    return (
        <Router>
            <div id="container-party-solo" onLoad={state.spec ? rien() : () => boucle(state)}>
                <div className="content-bord-solo">
                    <div id={state.room.rules[1] ? "minibord" : "bord"}>
                        <Makebord state={state} />
                        <MakeOverlay state={state} golobby={golobby} goHome={goHome} />
                    </div>
                </div>
                <aside id="info-party-solo">
                    <div id="next-piece-container">
                        <div id="solo-next-piece" onClick={onClickt}>
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
    onClickt: dipatcherOnNewPiece(dispatch),
    pageHome: (state) => {
        clearInterval(state.inter)
        dispatch(dataChangeHome())
        dispatch(removePlayerFromRoom(state))
        console.log('ok', state)
    },
    golobby: chargeLobby(dispatch),
    goHome: chargePageHome(dispatch),
    boucle: (state) => {
        let inter = setInterval(() => {
            dispatch(dataBoucle())
        }, state.room.rules[0] ? 500 : 1000);
        dispatch(dataLoadInter(inter))

    }
})
export default connect(mapStateToProps, mapDispatchToProps)(Solo)
