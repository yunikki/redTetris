import React from 'react'

function chooseColor(c) {
    switch (c) {
        case "PC":
            return ('rgb(232, 211, 49)');
        case "PB":
            return ('rgb(58, 234, 240)');
        case "PT":
            return ('rgb(188, 34, 227)');
        case "PL":
            return ('rgb(16, 112, 201)');
        case "Pl":
            return ('rgb(240, 167, 41)');
        case "PZ":
            return ('rgb(40, 235, 79)');
        case "Pz":
            return ('rgb(204, 8, 18)');
        case "C":
            return ('rgb(232, 211, 49)');
        case "B":
            return ('rgb(58, 234, 240)');
        case "T":
            return ('rgb(188, 34, 227)');
        case "L":
            return ('rgb(16, 112, 201)');
        case "l":
            return ('rgb(240, 167, 41)');
        case "Z":
            return ('rgb(40, 235, 79)');
        case "z":
            return ('rgb(204, 8, 18)');

        default:
            return ('#505050');
    }
}

function Makebord({ state }) {
    var container = []
    var key = 1
    var x = 0;
    while (x < 20) {
        const y = 0;
        while (y < 10) {
            if (state.grid) {
                container.push(<div className="caseBord" key={key} col={x} row={y} style={{ backgroundColor: chooseColor(state.grid[x][y]) }}></div >)
            }
            else
                container.push(<div className="caseBord" key={key} col={x} row={y} ></div >)
            y++;
            key++;
        }
        x++;
    }
    return (container)
}

export default Makebord
