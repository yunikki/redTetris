import reducer from '../reducers'
import ReactDOM from 'react-dom';
import Solo from './solo'
import Home from './home'

function clickBtnTest() {
    reducer.store.dispatch({ type: 'server/piecesSolo', data: 'Hello!' });
}

function chargeSolo() {
    ReactDOM.render(Solo(), document.getElementById("app"))
}

function backMenu() {
    ReactDOM.render(Home(), document.getElementById("app"));
}

export default { clickBtnTest, chargeSolo, backMenu }
