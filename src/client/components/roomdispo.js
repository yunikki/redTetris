import React from 'react'

function oui() {
    console.log('ta maman')
}

function FormatLine({ state }) {
    var ret = []

    for (var i in state.searchResult) {
        ret.push(<div className="line-room" key={i}>
            <div className="name-list">{state.searchResult[i].roomName}</div>
            <div className="creat-list">{state.searchResult[i].gameMaster}</div>
            <div className="player-list">{state.searchResult[i].players}</div>
            <div className="join-list" onClick={() => oui()}>join</div>
        </div>)
    }
    return (ret)
}

export function RoomDispo({ state }) {
    console.log('a tester :', Object.entries(state.searchResult).length === 0)
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
            <div id="list-room-line-first">
                <div className="name-list">Room name</div>
                <div className="creat-list">Creator</div>
                <div className="player-list">Players</div>
            </div>
            <FormatLine state={state} />
        </div>
    )
}
