import React from 'react'
import SpectreSolo from './spectreSolo'
import Makebord from '../components/makebord'
import { BrowserRouter as Router, Switch, Route, Link, withRouter, HashRouter } from "react-router-dom";
import { dipatcherOnNewPiece, chargePageHome } from "../components/action"
import MakeNewPiece from './makeMewPiece'
import { connect } from 'react-redux';
import { func } from 'prop-types';

function Solo({ onClickt, pageHome }) {
    var name = []

    return (
        <Router>
            <div id="container-party-solo" onLoad={console.log('testonload')}>
                <div className="content-bord-solo">
                    <div id="bord">
                        <Makebord />
                    </div>
                </div>
                <aside id="info-party-solo">
                    <div id="next-piece-container">
                        <div id="solo-next-piece" onClick={onClickt}>
                            <MakeNewPiece />
                        </div>
                    </div>
                    <p>Your Score :</p>
                    <img id="title-img" src="./assets/images/title.png"></img>
                    <div id="container-spectre-solo">

                        <SpectreSolo name={name} />

                    </div>
                    <Link id="return-menu" className="btn" to="/" onClick={pageHome}>Back to Menu</Link>
                </aside>

            </div>
        </Router>
    )
}

Solo.propTypes = {
    onClickt: func
};

const mapStateToProps = (state, ownProps) => ({

})

const mapDispatchToProps = (dispatch) => ({
    onClickt: dipatcherOnNewPiece(dispatch),
    pageHome: chargePageHome(dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(Solo)
