import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link, withRouter, HashRouter } from "react-router-dom";
import reducer from '../reducers'
import { connect } from 'react-redux';
import { chargePageSolo, inputYourName, inputYourNameRoom } from '../components/action'

function test() {
    console.log(test)
}

function Home({ pageSolo, inputYourName, inputYourNameRoom, state }) {
    return (
        <Router>
            <div id="menu">
                <div id="container-title">
                    <img id="title-img" src="./assets/images/title.png"></img>
                </div>
                <div id="menu-panel">
                    <div id="container-selec-quick">
                        <p>Fast Game</p>
                        <Link id="button-2player" className="btn" to="/solo" onClick={pageSolo}>One Player</Link>
                        <Link id="button-1player" className="btn" to="/solo" onClick={pageSolo}>Two Players</Link>
                    </div>
                    <div id="creat-party">
                        <p>Create Game</p>
                        <input className="input-creat" id="your-name-creat-room" type="text" placeholder="Your Name" onChange={inputYourName} />
                        <input className="input-creat" id="name-room-creat-room" type="text" placeholder="Room Name" onChange={inputYourNameRoom} />
                        <br></br>
                        <div id="button-start-room" className="btn" onClick={test} disabled={!state.runRoom}>Create Room</div>
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

const mapStateToProps = (state, ownProps) => ({
    state: state
})

const mapDispatchToProps = (dispatch) => {
    return ({
        pageSolo: chargePageSolo(dispatch),
        inputYourName: inputYourName(dispatch),
        inputYourNameRoom: inputYourNameRoom(dispatch)
    });
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)
