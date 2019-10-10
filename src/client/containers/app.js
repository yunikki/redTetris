import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Link, withRouter, HashRouter } from "react-router-dom";
import { homedir } from 'os';
import reducer from '../reducers'
import ReactDOM from 'react-dom';
import { func } from 'prop-types';



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

function SpectreSolo_(name, nb) {
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

    return (
        <div id="bord_display" key={nb}>
            <div id="spectre-border-container">
                container
        </div>
            <div>{name}</div>
        </div>
    )
}

function SpectreSolo(props) {
    var container = []
    var key = 1
    var nb = props.name.length
    console.log(nb)
    while (nb) {
        container.push(SpectreSolo_(props.name[nb - 1], nb))
        nb -= 1
        key += 1
    }

    return (
        <div className="wrapper-carrou" style={{ width: (props.name.length - 1) * 300 + "px" }}>
            {container}
        </div>
    )
}


function MakeNewPiece() {
    var container = []
    var key = 1
    var x = 0;


    while (x < 4) {
        const y = 0;
        while (y < 4) {
            if (reducer.store.piece === undefined)
                container.push(<div className="caseNewPiece" key={key} col={x} row={y}></div>);
            else {
                if (reducer.store.piece[y][x] == '#')
                    container.push(<div className="caseNewPiece" key={key} col={x} row={y} style={{ backgroundColor: "red" }} ></div>);
                else
                    container.push(<div className="caseNewPiece" key={key} col={x} row={y} style={{ backgroundColor: "#505050" }} ></div>);
            }

            y++;
            key++;
        }
        x++;
    }

    return (container)
}

function clickBtnTest() {
    reducer.store.dispatch({ type: 'server/piecesSolo', data: 'Hello!' });
}

function chargeSolo() {
    ReactDOM.render(Solo(), document.getElementById("app"))
}

function backMenu() {
    ReactDOM.render(Home(), document.getElementById("app"));
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
                        <p>Fast Game</p>
                        <Link id="button-2player" className="btn" to="/solo" onClick={clickBtnTest}>One Player</Link>
                        <Link id="button-1player" className="btn" to="/solo" onClick={chargeSolo}>Two Players</Link>
                    </div>
                    <div id="creat-party">
                        <p>Create Game</p>
                        <input className="input-creat" id="your-name-creat-room" type="text" placeholder="Your Name" />
                        <input className="input-creat" id="name-room-creat-room" type="text" placeholder="Room Name" />
                        <br></br>
                        <div id="button-start-room" className="btn" disabled>Create Room</div>
                    </div>


                </div>
                <h3>Join Game!</h3>
                <input className="input-creat" id="search-party" type="text" placeholder="search room" />
                <div id="list-room">
                    <div id="list-room-line-first">
                        <div className="name-list">Room name</div>
                        <div className="creat-list">Creator</div>
                        <div className="player-list">Players</div>
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
    var name = []
    name.push("mathieu")
    name.push("zaz")
    name.push("norminet")

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
                        <div id="solo-next-piece" onClick={clickBtnTest}>
                            <MakeNewPiece />
                        </div>
                    </div>
                    <p>Your Score :</p>
                    <img id="title-img" src="./assets/images/title.png"></img>
                    <div id="container-spectre-solo">

                        <SpectreSolo name={name} />

                    </div>
                    <Link id="return-menu" className="btn" to="/" onClick={backMenu}>Back to Menu</Link>
                </aside>

            </div>
        </Router>
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
