import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link, withRouter, HashRouter } from "react-router-dom";
import Home from './home'
import Solo from './solo'
import Lobby from './lobby'
import { connect } from 'react-redux';


function Comp(props) {
    const { match, location } = props;
    const re = location.hash.match(/#(.*)\[(.*)\]/)
    console.log("props", props)
    // if (re === null || props.inputName == "" || props.inputNameRoom == "")
    return <Home />

}

const MyComp = withRouter(Comp)

function App({ state }) {
    console.log('state', state.location)
    if (state.location == "Home") {
        return <Router><MyComp /></Router>
    }
    else if (state.location == "Solo") {
        return <Solo />
    }
    else if (state.location == "Lobby")
        return <Lobby />
    else
        return <Router>
            <Switch>

                <Route path="/">
                    <MyComp />
                </Route>
            </Switch>
        </Router>

}

const mapStateToProps = (state, ownProps) => ({
    state
})


export default connect(mapStateToProps)(App)
