import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link, withRouter, HashRouter } from "react-router-dom";
import { connect } from 'react-redux';

export function OptionRoom({ state }) {
    var NameOption = [];
    var option = [];

    NameOption.push('speedrun')
    NameOption.push('speedrun')
    NameOption.push('speedrun')
    console.log('haha je suis le state', state)
    if (state.master) {
        for (var i in NameOption) {
            option.push(
                <div className="container_option" key={i}>
                    <div className="name_option">{NameOption[i]}</div>
                    <input className="check_option" type="checkbox" value={NameOption[i]} defaultChecked={false}></input>
                </div>
            )
        }
    }
    else {
        for (var i in NameOption) {
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
    console.log('NameEnnemy', state.room)
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
