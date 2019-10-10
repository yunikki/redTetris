import reducer from '../reducers'
import ReactDOM from 'react-dom';
import Solo from './solo'
import Home from './home'

export function dipatcherOnNewPiece(dispatch) {
    return () => dispatch({ type: 'server/piecesSolo', data: 'Hello!' });
}

export function chargePageHome(dispatch) {
    return () => dispatch({ type: 'chargeHome', data: 'Hello!' });
}

export function chargePageSolo(dispatch) {
    return () => dispatch({ type: 'chargeSolo', data: 'Hello!' });
}
