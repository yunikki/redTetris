import React from 'react'

function SpectreSolo_(grid, player, nb, state) {
    var container = []
    let save = []
    var key = 1
    var x = 0;

    let compar1 = state.room.rules[1] ? 12 : 20
    while (x < compar1) {
        const y = 0;
        let compar2 = state.room.rules[1] ? 8 : 10
        while (y < compar2) {
            if ((grid[x][y] == "." || grid[x][y] == "S" || grid[x][y][0] == "P") && save.indexOf(y) == -1) {

                container.push(<div className="case-spectre-solo" key={key} col={x} row={y}>{grid[x][y]}</div>)
            }
            else {
                save.push(y)
                container.push(<div className="case-spectre-solo" key={key} col={x} row={y} style={{ backgroundColor: "red" }}></div>)
            }
            y += 1;
            key += 1;
        }
        x += 1;
    }
    return (
        <div id="bord_display" key={nb}>
            <div id={state.room.rules[1] ? "spectre-border-container-mini" : "spectre-border-container"}>
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

function getIDMaster(room) {
    let nb = 0
    for (let i in room.players) {
        if (room.players[i].gameMaster == 1)
            return (room.players[i].socketID)
    }
    return nb
}

function SpectreSolo({ state }) {
    if (state.spec == true) {
        let socketID = getIDMaster(state.room)
        var container = []
        let key = 0
        if (!state.room || !state.room.players)
            return (<div></div>)
        var nb = Math.abs(state.room.players.length - nbSpec(state.room))
        while (nb) {
            if (state.room.players[nb - 1].socketID != socketID && state.room.players[nb - 1].spec == false)
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
            if (state.room.players[nb - 1].socketID != state.socketID && state.room.players[nb - 1].spec == false)
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
