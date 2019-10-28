import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link, withRouter, HashRouter } from "react-router-dom";
import Home from './home'
import Solo from './solo'
import Lobby from './lobby'
import { connect } from 'react-redux';

function App({ state }) {
    if (state.location == "Home") {
        return <Home />
    }
    else if (state.location == "game") {
        return <Solo />
    }
    else if (state.location == "Lobby")
        return <Lobby />
    else
        return <Router>
            <Switch>

                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </Router>

}

const mapStateToProps = (state, ownProps) => ({
    state
})


export default connect(mapStateToProps)(App)
