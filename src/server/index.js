import fs from 'fs'
import debug from 'debug'
import { pieces } from './pieces/classPieces'
import { floorPiece } from "./pieces/keySpace"
import { setNewPieceInGridForAll } from "./pieces/setNewPiece"
import { fall_piece } from "./pieces/fallPiece"
import { getSearchResult } from './game/Game'
import { featherDrop } from './pieces/keyDown'
import { moveRight } from './pieces/keyRigth'
import { moveLeft } from './pieces/keyLeft'
import { resetParty } from './pieces/resetParty'
import { joinGame, getGame, removePlayer, getGameWithId, GameChangeParam, getGameWithNameRoom, updateRoomArray } from './game/Game'
import { keyUp } from "./pieces/keyUp"
import { isEndGame, resetRoomSpec, updateRoomFoorAll } from "./pieces/lib"

const logerror = debug('tetris:error')
    , loginfo = debug('tetris:info')

const initApp = (app, params, cb) => {
    const { host, port } = params
    const handler = (req, res) => {
        const file = req.url === '/bundle.js' ? '/../../build/bundle.js' : '/../../../index.html'
        fs.readFile(__dirname + file, (err, data) => {
            if (err) {
                logerror(err)
                res.writeHead(500)
                return res.end('Error loading index.html')
            }
            res.writeHead(200)
            res.end(data)
        })
    }
    app.on('request', handler)

    app.listen({ host, port }, () => {
        console.log(`tetris listen on ${params.url}`)
        cb()
    })
}

let rooms_array = [];

const initEngine = io => {

    io.on('connection', function (socket) {
        socket.emit('action', { type: 'GET_SOCKET', socketID: socket.id })
        function key(f, action) {
            let room = getGame(action.name, rooms_array);
            if (!room)
                return (false)
            room = f(room, socket.id)
            updateRoomArray(room, rooms_array)
            io.sockets.in(room.name).emit('action', { type: 'GAME_START', room: room })
            socket.broadcast.emit('action', { type: 'searchResult', results: getSearchResult(rooms_array) })
            if (isEndGame(room)) {
                room = resetRoomSpec(room)
                io.sockets.in(room.name).emit('action', { type: 'END_GAME', room: room })
            }
        }
        console.log("Socket connected: " + socket.id)
        socket.on('action', (action) => {
            console.log(action.type)
            if (action.type === 'server/creatRoom') {
                rooms_array = joinGame(action.roomName, action.playerName, action.socketID, rooms_array, action.priv);
                let room = getGame(action.socketID, rooms_array)
                if (!room)
                    return (false)
                socket.join(room.name)
                socket.emit('action', { type: 'joinRoom', room: room, master: 2 })
                io.sockets.in(room.name).emit('action', { type: 'joinRoom_', room: room, master: 2 })
                socket.emit('action', { type: 'searchResult', results: getSearchResult(rooms_array) })
                socket.broadcast.emit('action', { type: 'searchResult', results: getSearchResult(rooms_array) })
            }
            if (action.type === 'server/creatRoomSharp') {
                console.log(action)
                rooms_array = joinGame(action.roomName, action.playerName, socket.id, rooms_array, action.priv);
                let room = getGame(socket.id, rooms_array)
                if (!room)
                    return (false)
                socket.join(room.name)
                socket.emit('action', { type: 'joinRoomSharp', room: room, master: 2, id: socket.id })
                io.sockets.in(room.name).emit('action', { type: 'joinRoom_', room: room, master: 2 })
                socket.emit('action', { type: 'searchResult', results: getSearchResult(rooms_array) })
                socket.broadcast.emit('action', { type: 'searchResult', results: getSearchResult(rooms_array) })
            }
            else if (action.type == 'server/searchRoom') {
                socket.emit('action', { type: 'searchResult', results: getSearchResult(rooms_array) })
            }
            else if (action.type == 'server/removePlayerFromRoom') {
                let room = getGame(action.playerName, rooms_array)
                removePlayer(action.playerName, "", rooms_array);
                if (!room)
                    return (false)
                socket.leave(room.name)
                socket.emit('action', { type: 'joinRoom', room: undefined, master: false })
                updateRoomFoorAll(room, io)
                if (isEndGame(room)) {
                    room = resetRoomSpec(room)
                    io.sockets.in(room.name).emit('action', { type: 'END_GAME', room: room })
                }
                socket.emit('action', { type: 'searchResult', results: getSearchResult(rooms_array) })
                socket.broadcast.emit('action', { type: 'searchResult', results: getSearchResult(rooms_array) })
            }
            else if (action.type == 'server/changeParamRoom') {
                GameChangeParam(action.val, action.id, action.name, rooms_array)
                let room = getGameWithNameRoom(action.name, rooms_array)
                if (room)
                    updateRoomFoorAll(room, io)
            }
            else if (action.type == 'server/gameStart') {
                let room = getGame(action.playerName, rooms_array);
                if (!room)
                    return (false)
                let socketRoom = getGameWithNameRoom(room.name, rooms_array)
                let new_room = []
                socketRoom.Pieces.push(new pieces())
                socketRoom.Pieces.push(new pieces())
                if (!socketRoom)
                    return (undefined)
                socketRoom = resetParty(socketRoom)
                socketRoom = setNewPieceInGridForAll(socketRoom)
                socketRoom.status = "runing"
                updateRoomArray(socketRoom, rooms_array)
                io.sockets.in(room.name).emit('action', { type: 'GAME_START_', room: socketRoom })
                socket.broadcast.emit('action', { type: 'searchResult', results: getSearchResult(rooms_array) })
            }
            else if (action.type == 'server/keyDown') {
                key(featherDrop, action)
            }
            else if (action.type == 'server/keySpace') {
                key(floorPiece, action)
            }
            else if (action.type == 'server/keyleft') {
                key(moveLeft, action)
            }
            else if (action.type == 'server/keyRight') {
                key(moveRight, action)
            }
            else if (action.type == 'server/boucle') {
                key(fall_piece, action)
            }
            else if (action.type == "server/keyUp") {
                key(keyUp, action)
            }
        })

        socket.on('disconnect', function () {
            let room = getGameWithId(socket.id, rooms_array)
            let player = removePlayer("", socket.id, rooms_array)
            if (room && isEndGame(room)) {
                room = resetRoomSpec(room)
                io.sockets.in(room.name).emit('action', { type: 'END_GAME', room: room })
            }
            if (room) {
                socket.leave(room.name)
                updateRoomFoorAll(room, io)
            }
            socket.broadcast.emit('action', { type: 'searchResult', results: getSearchResult(rooms_array) })
        })
    })
}

export function create(params) {
    const promise = new Promise((resolve, reject) => {
        const app = require('http').createServer()
        initApp(app, params, () => {
            const io = require('socket.io')(app)
            const stop = (cb) => {
                io.close()
                app.close(() => {
                    app.unref()
                })
                console.log(`Engine stopped.`)
                cb()
            }
            initEngine(io)
            resolve({ stop })
        })
    })
    return promise
}
