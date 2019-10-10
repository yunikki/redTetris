import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link, withRouter, HashRouter } from "react-router-dom";
import reducer from '../reducers'
import { connect } from 'react-redux';
import { chargePageSolo } from './action'

function test() {
    console.log(test)
}

function inpuYourName(props) {

}

function inputNameRoom(props) {

}


function Home({ pageSolo }) {
    return (
        <Router>
            <div id="menu">
                <div id="container-title">
                    <img id="title-img" src="./assets/images/title.png"></img>
                </div>
                <div id="menu-panel">
                    <div id="container-selec-quick">
                        <p>Fast Game</p>
                        {/* <Link id="button-2player" className="btn" to="/solo" onClick={a.clickBtnTest}>One Player</Link>*/}
                        <Link id="button-1player" className="btn" to="/solo" onClick={pageSolo}>Two Players</Link>
                    </div>
                    <div id="creat-party">
                        <p>Create Game</p>
                        <input className="input-creat" id="your-name-creat-room" type="text" placeholder="Your Name" onChange={inpuYourName} />
                        <input className="input-creat" id="name-room-creat-room" type="text" placeholder="Room Name" onChange={inputNameRoom} />
                        <br></br>
                        <div id="button-start-room" className="btn" onClick={test} disabled>Create Room</div>
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

})

const mapDispatchToProps = (dispatch) => ({
    pageSolo: chargePageSolo(dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(Home)
