export const SERVEUR_PIECESSOLO = 'server/piecesSolo'
export const SERVEUR_CREAT_ROOM = 'server/creatRoom'

export const dataPiecesSolo = () => {
    return {
        type: SERVEUR_PIECESSOLO
    }
}
export const dataCreateRoom = (state) => {
    return {
        type: SERVEUR_CREAT_ROOM,
        data: state.inputNameRoom
    }
}
