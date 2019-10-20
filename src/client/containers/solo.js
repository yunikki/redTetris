import React from 'react'
import SpectreSolo from './spectreSolo'
import Makebord from '../components/makebord'
import { BrowserRouter as Router, Switch, Route, Link, withRouter, HashRouter } from "react-router-dom";
import { dipatcherOnNewPiece, chargePageHome, chargeLobby } from "../components/action"
import { removePlayerFromRoom, dataBoucle } from "../actions/server"
import { dataChangeHome, dataLoadInter } from "../actions/"
import MakeNewPiece from './makeMewPiece'
import { connect } from 'react-redux';
import { func } from 'prop-types';
import { getPlayer } from '../reducers/reducer'

function MakeOverlay({ state, golobby }) {
    if (state.loose) {
        return ([<div className="overlay">
        </div>,
        <div className="custom_overlay">
            <p>you loose</p>
            <a id="return-menu" class="btn" onClick={golobby}>Back to lobby</a>
        </div>])
    }
    else {
        return (<div></div>)
    }
}

function Solo({ onClickt, pageHome, state, boucle, golobby }) {
    var name = []

    return (
        <Router>
            <div id="container-party-solo" onLoad={boucle}>
                <div className="content-bord-solo">
                    <div id="bord">
                        <Makebord state={state} />
                        <MakeOverlay state={state} golobby={golobby} />
                    </div>
                </div>
                <aside id="info-party-solo">
                    <div id="next-piece-container">
                        <div id="solo-next-piece" onClick={onClickt}>
                            <MakeNewPiece piece={state.piece} />
                        </div>
                    </div>
                    <p>Your Score :</p>
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
    onClickt: dipatcherOnNewPiece(dispatch),
    pageHome: (state) => {
        clearInterval(state.inter)
        dispatch(dataChangeHome())
        dispatch(removePlayerFromRoom(state))
        console.log('ok', state)
    },
    golobby: chargeLobby(dispatch),
    boucle: (state) => {
        let inter = setInterval((state) => {
            dispatch(dataBoucle())
        }, 500, state);
        dispatch(dataLoadInter(inter))

    }
})
export default connect(mapStateToProps, mapDispatchToProps)(Solo)
