import React from 'react'
import { FormatLine } from './lienroomdispo'

export function RoomDispo({ state, dispatch }) {
    if (state.inputName === "")
        return (<div></div>)
    if (Object.entries(state.searchResult).length === 0)
        return (
            <div id="list-room">
                <div id="list-room-line-first">
                    <div className="name-list">Room name</div>
                    <div className="creat-list">Creator</div>
                    <div className="player-list">Players</div>
                </div>
                <div className="line-room">
                    on a pas trouver de room deso !
                </div>
            </div>
        )
    return (
        <div id="list-room">
            <div id="list-room-line-first" key={0}>
                <div className="name-list">Room name</div>
                <div className="creat-list">Creator</div>
                <div className="player-list">Players</div>
            </div>
            <FormatLine to={"/#" + state.inputNameRoom + '[' + state.inputName + ']'} state={state} dispatch={dispatch} />
        </div>
    )
}
