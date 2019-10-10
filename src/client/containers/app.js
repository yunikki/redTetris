import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link, withRouter, HashRouter } from "react-router-dom";
import Home from './home'
import Solo from './solo'


function Comp(props) {
    const { match, location } = props;
    const re = location.hash.match(/#(.*)\[(.*)\]/)

    if (re === null)
        return Home()
    return <div>{` room : ${re[1]} <> ${re[2]}`}</div>;
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
