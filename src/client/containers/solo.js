import React from 'react'
import SpectreSolo from './spectreSolo'
import Makebord from '../components/makebord'
import { BrowserRouter as Router, Switch, Route, Link, withRouter, HashRouter } from "react-router-dom";
import { dipatcherOnNewPiece, chargePageHome } from "../components/action"
import { removePlayerFromRoom } from "../actions/server"
import { dataChangeHome } from "../actions/"
import MakeNewPiece from './makeMewPiece'
import { connect } from 'react-redux';
import { func } from 'prop-types';

function Solo({ onClickt, pageHome, state }) {
    var name = []

    return (
        <Router>
            <div id="container-party-solo">
                <div className="content-bord-solo">
                    <div id="bord">
                        <Makebord state={state} />
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
        dispatch(dataChangeHome())
        dispatch(removePlayerFromRoom(state))
        console.log('ok', state)
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(Solo)
