import React from 'react'
import SpectreSolo from './spectreSolo'
import Makebord from './makebord'
import { BrowserRouter as Router, Switch, Route, Link, withRouter, HashRouter } from "react-router-dom";
import a from "./action"
import MakeNewPiece from './makeMewPiece'

function Solo() {
    var name = []

    return (
        <Router>
            <div id="container-party-solo" onLoad={console.log('bite')}>
                <div className="content-bord-solo">
                    <div id="bord">
                        <Makebord />
                    </div>
                </div>
                <aside id="info-party-solo">
                    <div id="next-piece-container">
                        <div id="solo-next-piece" onClick={a.clickBtnTest}>
                            <MakeNewPiece />
                        </div>
                    </div>
                    <p>Your Score :</p>
                    <img id="title-img" src="./assets/images/title.png"></img>
                    <div id="container-spectre-solo">

                        <SpectreSolo name={name} />

                    </div>
                    <Link id="return-menu" className="btn" to="/" onClick={a.backMenu}>Back to Menu</Link>
                </aside>

            </div>
        </Router>
    )
}

export default Solo
