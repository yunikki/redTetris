import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link, withRouter, HashRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { dataChangeParamRoom } from '../actions/server'

function test(state, e, dispatch, name) {
    dispatch(dataChangeParamRoom(e.target.checked, e.target.getAttribute('option'), name))
}
export function OptionRoom({ state, dispatch }) {
    var NameOption = [];
    var option = [];
    if (!state.room || !state.room.rules)
        return (<div></div>)
    NameOption.push('speedrun')
    NameOption.push('junior board')
    NameOption.push('scord mode')
    NameOption.push('bubble tiles')
    if (state.master) {
        for (var i in NameOption) {
            option.push(
                <div className="container_option" key={i}>
                    <div className="name_option">{NameOption[i]}</div>
                    <input className="check_option" type="checkbox" option={i} onChange={(e) => test(state, e, dispatch, state.room.name)} defaultChecked={state.room.rules[i]}></input>
                </div>
            )
        }
    }
    else {
        for (var i in NameOption) {
            if (state.room.rules[i])
                option.push(
                    <div className="container_option" key={i}>
                        <div className="name_option">{NameOption[i]}</div>
                    </div>
                )
        }
    }

    return (option)
}

export function NameEnnemy({ state }) {
    var ret = []
    if (state.room == undefined)
        return (ret)
    var Name = state.room.players
    var you = true
    for (var i in Name) {
        if (you && Name[i].name == state.inputName) {
            you = false
            continue
        }
        ret.push(
            <p className="list_name_lobby" key={i}> {Name[i].name}</p>
        )
    }
    return (ret)
}
