import React from 'react'
import reducer from '../reducers'

function MakeNewPiece() {
    var container = []
    var key = 1
    var x = 0;

    while (x < 4) {
        const y = 0;
        while (y < 4) {
            if (reducer.store.piece === undefined)
                container.push(<div className="caseNewPiece" key={key} col={x} row={y}></div>);
            else {
                if (reducer.store.piece[y][x] == '#')
                    container.push(<div className="caseNewPiece" key={key} col={x} row={y} style={{ backgroundColor: "red" }} ></div>);
                else
                    container.push(<div className="caseNewPiece" key={key} col={x} row={y} style={{ backgroundColor: "#505050" }} ></div>);
            }
            y++;
            key++;
        }
        x++;
    }
    return (container)
}

export default MakeNewPiece
