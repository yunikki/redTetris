import React from 'react'

function Makebord() {
    var container = []
    var key = 1
    var x = 0;

    while (x < 10) {
        const y = 0;
        while (y < 20) {
            container.push(<div className="caseBord" key={key} col={x} row={y}></div>)
            y++;
            key++;
        }
        x++;
    }
    return (container)
}

export default Makebord
