import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link, withRouter, HashRouter } from "react-router-dom";
import Home from './home'
import Solo from './solo'
import Lobby from './lobby'
import { connect } from 'react-redux';


function Comp(props) {
    const { match, location } = props;
    const re = location.hash.match(/#(.*)\[(.*)\]/)
    console.log(props)
    if (re === null)
        return <Home />
    return <Lobby />
}

const MyComp = withRouter(Comp)

function App({ location }) {
    console.log(location)
    if (location == "Home") {
        return <Router><MyComp /></Router>
    }
    else if (location == "Solo") {
        return <Solo />
    }
    else if (location == "Lobby")
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
    location: state.location
})


export default connect(mapStateToProps)(App)
