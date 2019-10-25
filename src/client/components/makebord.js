import React from 'react'

function chooseColor(c, r) {
    switch (c) {
        case "PC":
            return (r ? 'url("./assets/images/1.jpg")' : 'rgb(232, 211, 49)');
        case "PB":
            return (r ? 'url("./assets/images/2.jpg")' : 'rgb(58, 234, 240)');
        case "PT":
            return (r ? 'url("./assets/images/3.jpg")' : 'rgb(188, 34, 227)');
        case "PL":
            return (r ? 'url("./assets/images/4.jpg")' : 'rgb(16, 112, 201)');
        case "Pl":
            return (r ? 'url("./assets/images/5.jpg")' : 'rgb(240, 167, 41)');
        case "PZ":
            return (r ? 'url("./assets/images/6.jpg")' : 'rgb(40, 235, 79)');
        case "Pz":
            return (r ? 'url("./assets/images/7.jpg")' : 'rgb(204, 8, 18)');
        case "C":
            return (r ? 'url("./assets/images/1.jpg")' : 'rgb(232, 211, 49)');
        case "B":
            return (r ? 'url("./assets/images/2.jpg")' : 'rgb(58, 234, 240)');
        case "T":
            return (r ? 'url("./assets/images/3.jpg")' : 'rgb(188, 34, 227)');
        case "L":
            return (r ? 'url("./assets/images/4.jpg")' : 'rgb(16, 112, 201)');
        case "l":
            return (r ? 'url("./assets/images/5.jpg")' : 'rgb(240, 167, 41)');
        case "Z":
            return (r ? 'url("./assets/images/6.jpg")' : 'rgb(40, 235, 79)');
        case "z":
            return (r ? 'url("./assets/images/7.jpg")' : 'rgb(204, 8, 18)');
        case "S":
            return (r ? 'url("./assets/images/8.jpg")' : 'rgb(48, 47, 51)');
        case "b":
            return (r ? 'url("./assets/images/mpinson.jpg")' : '#000000');
        default:
            return ('#505050');
    }
}

function Makebord({ state }) {
    var container = []
    var key = 1
    var x = 0;
    let compar1 = state.room.rules[1] ? 12 : 20
    while (x < compar1) {
        const y = 0;
        let compar2 = state.room.rules[1] ? 8 : 10
        while (y < compar2) {
            if (state.grid) {
                container.push(<div className={state.room.rules[3] ? "caseBoardBuble" : "caseBord"
                } key={key} col={x} row={y} style={{ background: chooseColor(state.grid[x][y], state.room.rules[4]) }}></div >)
            }
            else
                container.push(<div className={state.room.rules[3] ? "caseBoardBuble" : "caseBord"
                } key={key} col={x} row={y} ></div >)
            y++;
            key++;
        }
        x++;
    }
    return (container)
}

export default Makebord
