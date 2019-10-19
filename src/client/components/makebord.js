import React from 'react'

function chooseColor(c) {
    switch (c) {
        case 'PR':
            return ('red');
        case 'PG':
            return ('green');
        case 'PB':
            return ('blue');
        case 'PO':
            return ('orange');
        case 'PV':
            return ('purple');
        case 'R':
            return ('red');
        case 'G':
            return ('green');
        case 'B':
            return ('blue');
        case 'O':
            return ('orange');
        case 'V':
            return ('purple');

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
