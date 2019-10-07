import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Link, withRouter, HashRouter } from "react-router-dom";
import { homedir } from 'os';

function Makebord(c) {
    var container = []
    var key = 1
    var x = 0;

    while (x < 10) {
        const y = 0;
        while (y < 20) {
            container.push(<div className="caseBord" key={key} col={x} row={y}></div>)
            y++;
            key++;
        }
        x++;
    }

    return (container)
}

function SpectreSolo(c) {
    var container = []
    var key = 1
    var x = 0;

    while (x < 10) {
        const y = 0;
        while (y < 20) {
            container.push(<div className="case-spectre-solo" key={key} col={x} row={y}></div>)
            y++;
            key++;
        }
        x++;
    }

    return (container)
}


function MakeNewPiece() {
    var container = []
    var key = 1
    var x = 0;


    while (x < 4) {
        const y = 0;
        while (y < 4) {
            container.push(<div className="caseNewPiece" key={key} col={x} row={y}></div>)
            y++;
            key++;
        }
        x++;
    }

    return (container)
}

function Home() {
    return (
        <Router>
            <div id="menu">
                <div id="container-title">
                    <img id="title-img" src="./assets/images/title.png"></img>
                </div>
                <div id="menu-panel">
                    <div id="container-selec-quick">
                        <p>parti rapide</p>
                        <Link id="button-2player" className="btn" to="/solo">tow payer</Link>
                        <Link id="button-1player" className="btn" to="/solo">one payer</Link>
                    </div>
                    <div id="creat-party">
                        <p>creat room</p>
                        <input className="input-creat" id="your-name-creat-room" type="text" placeholder="your name" />
                        <input className="input-creat" id="name-room-creat-room" type="text" placeholder="room name" />
                        <br></br>
                        <div id="button-start-room" className="btn" disabled>creat-room</div>
                    </div>


                </div>
                <h3>join party !</h3>
                <input className="input-creat" id="search-party" type="text" placeholder="search room" />
                <div id="list-room">
                    <div id="list-room-line-first">
                        <div className="name-list">name room</div>
                        <div className="creat-list">cretor</div>
                        <div className="player-list">player</div>
                    </div>
                </div>
            </div>
        </Router>

    )
}

function Comp(props) {
    const { match, location } = props;

    console.log(match, location);
    const re = location.hash.match(/#(.*)\[(.*)\]/)
    console.log(re)

    if (re === null)
        return Home()

    return <div>{` room : ${re[1]} <> ${re[2]}`}</div>;
}

function Solo() {
    return (
        <div id="container-party-solo">
            <div className="content-bord-solo">
                <div id="bord">
                    <Makebord />
                </div>
            </div>
            <aside id="info-party-solo">
                <div id="next-piece-container">
                    <div id="solo-next-piece">
                        <MakeNewPiece />
                    </div>
                </div>
                <p>your score :</p>
                <img id="title-img" src="./assets/images/title.png"></img>
                <div id="container-spectre-solo">
                    <div id="bord_display">
                        <div id="spectre-border-container">
                            <SpectreSolo />
                        </div>
                    </div>
                </div>

            </aside>

        </div>
    )
}

const MyComp = withRouter(Comp)

export default function App() {
    return <Router>
        <Switch>
            <Route exact path="/solo">
                <Solo />
            </Route>
            <Route path="/">
                <MyComp />
            </Route>
        </Switch>
    </Router>

}
