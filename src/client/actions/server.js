export const SERVEUR_PIECESSOLO = 'server/piecesSolo'
export const SERVEUR_CREAT_ROOM = 'server/creatRoom'
export const SERVER_SEARCH_ROOM = 'server/searchRoom'

export const dataPiecesSolo = () => {
    return {
        type: SERVEUR_PIECESSOLO
    }
}
export const dataCreateRoom = (state) => {
    console.log("ETAT FRANCAIS", state)
    return {
        type: SERVEUR_CREAT_ROOM,
        roomName: state.inputNameRoom,
        playerName: state.inputName,
        socketID: state.socketID
    }
}

