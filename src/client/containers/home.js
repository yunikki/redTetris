import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link, withRouter, HashRouter } from "react-router-dom";
import reducer from '../reducers'
import { RoomDispo } from '../components/roomdispo'
import { connect } from 'react-redux';
import { chargePageSolo, inputYourName, inputYourNameRoom, chargeLobby, searchingRooms, saveSearch, strRandom } from '../components/action'
import { dataChargeLobby, dataChangeInputName, dataTMaster, dataChangeInputNameRoom } from '../actions'
import { dataCreateRoom, getRoomInfos, dataCreateRoomSolo, startGame } from '../actions/server'

function notChargeLobby() {
}

function Home({ pageSolo, dispatch, inputYourNameRoom, state, chargeLobby, startSearch }) {
    return (
        <Router>
            <div id="menu">
                <div id="container-title">
                    <img id="title-img" src="./assets/images/title.png"></img>
                </div>
                <div id="menu-panel">
                    <div id="container-selec-quick">
                        <p>Fast Game</p>
                        <Link id="button-2player" className="btn" to="/solo" onClick={() => pageSolo(state)}>One Player</Link>
                        <Link id="button-1player" className="btn" to="/solo" onClick={() => pageSolo(state)}>Two Players</Link>
                    </div>
                    <div id="creat-party">
                        <p>Create Game</p>
                        <input className="input-creat" value={state.inputName} id="your-name-creat-room" type="text" placeholder="Your Name" onChange={(e) => startSearch(e)} />
                        <input className="input-creat" id="name-room-creat-room" type="text" placeholder="Room Name" onChange={inputYourNameRoom} />
                        <br></br>
                        <Link id="button-start-room" className="btn" to={!state.runRoom ? "" : "/#" + state.inputNameRoom + '[' + state.inputName + ']'} onClick={state.runRoom ? () => chargeLobby(state) : notChargeLobby} disabled={!state.runRoom}>Create Room</Link>
                    </div>


                </div>
                <h3>Join Game!</h3>
                <input className="input-creat" value={state.inputName} id="search-party" type="text" placeholder="entre un nom avent d aller dans une room" onChange={(e) => startSearch(e)} />

                <div >
                    <RoomDispo state={state} dispatch={dispatch} />
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
        dispatch: dispatch,
        pageSolo: (state) => {
            let str = state.socketID
            dispatch(dataChangeInputName(str))
            state.inputName = str
            dispatch(dataCreateRoomSolo(state, str))
            dispatch(startGame(state))
        },
        inputYourNameRoom: inputYourNameRoom(dispatch),
        chargeLobby: (state) => {
            dispatch(dataTMaster())
            dispatch(dataCreateRoom(state))
            dispatch(dataChargeLobby())
        },
        startSearch: (e) => {
            dispatch(dataChangeInputName(e.target.value))
            dispatch(saveSearch(dispatch, e))
            dispatch(getRoomInfos())
        }
    });
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)
