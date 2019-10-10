import React from 'react'

function SpectreSolo_(name, nb) {
    var container = []
    var key = 1
    var x = 0;

    while (x < 10) {
        const y = 0;
        while (y < 20) {
            container.push(<div className="case-spectre-solo" key={key} col={x} row={y}></div>)
            y++;
            key++;
        }
        x++;
    }

    return (
        <div id="bord_display" key={nb}>
            <div id="spectre-border-container">
                container
        </div>
            <div>{name}</div>
        </div>
    )
}

function SpectreSolo(props) {
    var container = []
    var key = 1
    var nb = props.name.length
    console.log(nb)
    while (nb) {
        container.push(SpectreSolo_(props.name[nb - 1], nb))
        nb -= 1
        key += 1
    }

    return (
        <div className="wrapper-carrou" style={{ width: (props.name.length - 1) * 300 + "px" }}>
            {container}
        </div>
    )
}


export default SpectreSolo
