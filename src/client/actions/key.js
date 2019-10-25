import { DataKeyDown, DataKeyLeft, DataKeyRight, DataKeySpace, DataKeyUp } from "./server"
import { data_konami } from "./index"

var tab_konami = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

function isKonmai(t) {
    if (t[0] != 38)
        return false
    if (t[1] != 38)
        return false
    if (t[2] != 40)
        return false
    if (t[3] != 40)
        return false
    if (t[4] != 37)
        return false
    if (t[5] != 39)
        return false
    if (t[6] != 37)
        return false
    if (t[7] != 39)
        return false
    if (t[8] != 66)
        return false
    if (t[9] != 65)
        return false
    return true
}

export function keyTetris(e, dispatch, state) {
    if (state.location == "Lobby") {
        tab_konami.push(e.keyCode)
        tab_konami.shift()
        if (isKonmai(tab_konami))
            dispatch(data_konami())
    }
    else
        tab_konami = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    if (state.location == "game" && (e.key == 'w' || e.key == 'ArrowUp'))
        dispatch(DataKeyUp(state.inputName))
    else if (state.location == "game" && (e.key == 's' || e.key == 'ArrowDown'))
        dispatch(DataKeyDown(state.inputName))
    else if (state.location == "game" && (e.key == 'a' || e.key == 'ArrowLeft'))
        dispatch(DataKeyLeft(state.inputName))
    else if (state.location == "game" && (e.key == 'd' || e.key == 'ArrowRight'))
        dispatch(DataKeyRight(state.inputName))
    else if (state.location == "game" && (e.key == ' '))
        dispatch(DataKeySpace(state.inputName))
}
