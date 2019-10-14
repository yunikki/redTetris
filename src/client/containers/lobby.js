import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link, withRouter, HashRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { chargePageSolo, chargePageHome } from '../components/action'

function Lobby({ pageSolo, pageHome }) {
    return (
        <Router>
            <div id="menu">
                <div id="container-title">
                    <img id="title-img" src="./assets/images/title.png"></img>
                </div>
                <div id="menu-panel">
                    <h2 > location.master?</h2>
                    <h3>players:</h3>
                    <p className="list_name_lobby">you: (mpinpon)</p>
                    <p className="list_name_lobby"> other 1</p>
                    <h3>mode enabel:</h3>
                    <div className="container_option">
                        <div className="name_option">speedrun :</div>
                        <input className="check_option" type="checkbox" ></input>
                    </div>
                    <div className="container_option">
                        <div className="name_option">speedrun :</div>
                        <input className="check_option" type="checkbox" ></input>
                    </div>
                    <div className="container_option">
                        <div className="name_option">speedrun :</div>
                        <input className="check_option" type="checkbox" ></input>
                    </div>
                    <div id="container-selec-quick">
                        <Link id="button-2player" className="btn" to="/solo" onClick={pageHome}>leave the room</Link>
                        <Link id="button-1player" className="btn" to="/solo" onClick={pageSolo}>start the game</Link>
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
        pageHome: chargePageHome(dispatch)
    });
}
export default connect(mapStateToProps, mapDispatchToProps)(Lobby)
