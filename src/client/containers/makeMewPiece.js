import React from 'react'
import { connect } from 'react-redux';
import { object } from 'prop-types';

function MakeNewPiece({ piece }) {
    var container = []
    var key = 1
    var x = 0;
    while (x < 4) {
        const y = 0;
        while (y < 4) {
            if (piece === undefined)
                container.push(<div className="caseNewPiece" key={key} col={x} row={y}></div>);
            else {
                if (piece[y][x] == '#')
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



const mapStateToProps = (state) => {
    return ({
        piece: state.piece
    })
};

export default connect(mapStateToProps)(MakeNewPiece)
