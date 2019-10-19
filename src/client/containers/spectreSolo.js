import React from 'react'

function SpectreSolo_(grid, name, nb) {
    var container = []
    var key = 1
    var x = 0;

    while (x < 20) {
        const y = 0;
        while (y < 10) {
            if (grid[x][y] == ".") {
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
            <div>{name}</div>
        </div>
    )
}

function SpectreSolo({ state }) {
    var container = []
    var key = 0
    var nb = state.room.players.length
    while (nb) {
        if (state.room.players[nb - 1].name != state.inputName)
            container.push(SpectreSolo_(state.room.players[nb - 1].grid, state.room.players[nb - 1].name, nb))
        nb -= 1
        key += 1
    }

    return (
        <div className="wrapper-carrou" style={{ width: (state.room.players.length - 2) * 300 + "px" }}>
            {container}
        </div>
    )
}


export default SpectreSolo
