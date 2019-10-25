import React from 'react'

function SpectreSolo_(grid, player, nb, state) {
    var container = []
    var key = 1
    var x = 0;

    while (x < 20) {
        const y = 0;
        while (y < 10) {
            if (grid[x][y] == "." || grid[x][y] == "S" || grid[x][y][0] == "P") {
                container.push(<div className="case-spectre-solo" key={key} col={x} row={y}>{grid[x][y]}</div>)
            }
            else
                container.push(<div className="case-spectre-solo" key={key} col={x} row={y} style={{ backgroundColor: "red" }}></div>)
            y++;
            key++;
        }
        x++;
    }
    return (
        <div id="bord_display" key={nb}>
            <div id="spectre-border-container">
                {container}
            </div>
            {state.room.rules[2] ? <div>{player.name + " : " + player.score}</div> : <div>{player.name}</div>}
        </div>
    )
}

function nbSpec(room) {
    let nb = 0
    for (let i in room.players) {
        if (room.players[i].spec == true)
            nb += 1
    }
    return nb
}

function getNameMaster(room) {
    let nb = 0
    for (let i in room.players) {
        if (room.players[i].gameMaster == 1)
            return (room.players[i].name)
    }
    return nb
}

function SpectreSolo({ state }) {
    if (state.spec == true) {
        let name = getNameMaster(state.room)
        var container = []
        let key = 0
        if (!state.room || !state.room.players)
            return (<div></div>)
        var nb = Math.abs(state.room.players.length - nbSpec(state.room))
        while (nb) {
            if (state.room.players[nb - 1].name != name && state.room.players[nb - 1].spec == false)
                container.push(SpectreSolo_(state.room.players[nb - 1].grid, state.room.players[nb - 1], nb, state))
            nb -= 1
            key += 1
        }
        return (
            <div className="wrapper-carrou" style={{ width: (Math.abs(state.room.players.length - nbSpec(state.room)) - 2) * 300 + "px" }}>
                {container}
            </div>
        )
    }
    else {
        let key = 0
        var container = []
        if (!state.room || !state.room.players)
            return (<div></div>)
        var nb = Math.abs(state.room.players.length - nbSpec(state.room))
        while (nb) {
            if (state.room.players[nb - 1].name != state.inputName && state.room.players[nb - 1].spec == false)
                container.push(SpectreSolo_(state.room.players[nb - 1].grid, state.room.players[nb - 1], nb, state))
            nb -= 1
            key += 1
        }
        return (
            <div className="wrapper-carrou" style={{ width: (Math.abs(state.room.players.length - nbSpec(state.room)) - 2) * 300 + "px" }}>
                {container}
            </div>
        )
    }
}


export default SpectreSolo
