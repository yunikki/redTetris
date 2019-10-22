import fs from 'fs'
import debug from 'debug'
import { resetParty, pieces, getPieces, setNewPieceInGridForAll, setNewPieceInGrid, fall_piece, floorPiece, featherDrop, moveLeft, moveRight } from './pieces/classPieces'
import { getSearchResult } from './game/Game'
import { Player } from './player/Player'
import { Game, joinGame, getGame, removePlayer, getGameWithId, GameChangeParam, getGameWithNameRoom, updateRoomArray } from './game/Game'
import { keyUp } from "./pieces/keyUp"


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

function emit_to_room(room, io) {
    if (room)
        for (var i in room.players) {
            io.to(room.players[i].socketID).emit('action', { type: 'joinRoom', room: room, master: room.players[i].gameMaster })
        }
}


const initEngine = io => {
    io.on('connection', function (socket) {
        console.log("Socket connected: " + socket.id)
        socket.on('action', (action) => {
            console.log(action.type)
            if (action.type === 'server/piecesSolo') {
                socket.emit('action', { type: 'newPiece', piece: getPieces() })
            }
            if (action.type === 'server/creatRoom') {
                rooms_array = joinGame(action.roomName, action.playerName, action.socketID, rooms_array, action.priv);
                let room = getGame(action.playerName, rooms_array)
                socket.join(room.name)

                socket.emit('action', { type: 'joinRoom', room: room, master: 2 })
                socket.broadcast.emit('action', { type: 'joinRoom_', room: room, master: 2 })
                socket.emit('action', { type: 'searchResult', results: getSearchResult(rooms_array) })
                socket.broadcast.emit('action', { type: 'searchResult', results: getSearchResult(rooms_array) })
            }
            if (action.type == 'server/searchRoom') {
                socket.emit('action', { type: 'searchResult', results: getSearchResult(rooms_array) })
            }
            if (action.type == 'server/removePlayerFromRoom') {
                let room = getGame(action.playerName, rooms_array)
                if (room)
                    socket.leave(room.name)
                let removedPlayer = removePlayer(action.playerName, "", rooms_array);
                socket.emit('action', { type: 'joinRoom', room: undefined, master: false })
                if (room)
                    emit_to_room(room, io)
                if (isEndGame(room)) {
                    room = resetRoomSpec(room)
                    io.sockets.in(room.name).emit('action', { type: 'END_GAME', room: room })
                }
                socket.emit('action', { type: 'searchResult', results: getSearchResult(rooms_array) })
                socket.broadcast.emit('action', { type: 'searchResult', results: getSearchResult(rooms_array) })
            }
            if (action.type == 'server/changeParamRoom') {
                GameChangeParam(action.val, action.id, action.name, rooms_array)
                let room = getGameWithNameRoom(action.name, rooms_array)
                if (room)
                    emit_to_room(room, io)
            }

            if (action.type == 'server/keyDown') {
                let room = getGame(action.name, rooms_array);
                room = featherDrop(room, socket.id)

                io.sockets.in(room.name).emit('action', { type: 'GAME_START', room: room })
                socket.broadcast.emit('action', { type: 'searchResult', results: getSearchResult(rooms_array) })
                updateRoomArray(room, rooms_array)
                if (isEndGame(room)) {
                    room = resetRoomSpec(room)
                    io.sockets.in(room.name).emit('action', { type: 'END_GAME', room: room })
                }
            }
            if (action.type == 'server/keySpace') {
                let room = getGame(action.name, rooms_array);
                room = floorPiece(room, socket.id)

                io.sockets.in(room.name).emit('action', { type: 'GAME_START', room: room })
                socket.broadcast.emit('action', { type: 'searchResult', results: getSearchResult(rooms_array) })
                updateRoomArray(room, rooms_array)
                if (isEndGame(room)) {
                    room = resetRoomSpec(room)
                    io.sockets.in(room.name).emit('action', { type: 'END_GAME', room: room })
                }
            }
            if (action.type == 'server/keyleft') {
                let room = getGame(action.name, rooms_array);
                room = moveLeft(room, socket.id)
                updateRoomArray(room, rooms_array)
                io.sockets.in(room.name).emit('action', { type: 'GAME_START', room: room })
                socket.broadcast.emit('action', { type: 'searchResult', results: getSearchResult(rooms_array) })
                if (isEndGame(room)) {
                    room = resetRoomSpec(room)
                    io.sockets.in(room.name).emit('action', { type: 'END_GAME', room: room })
                }
            }
            if (action.type == 'server/keyRight') {
                let room = getGame(action.name, rooms_array);
                room = moveRight(room, socket.id)
                updateRoomArray(room, rooms_array)
                io.sockets.in(room.name).emit('action', { type: 'GAME_START', room: room })
                socket.broadcast.emit('action', { type: 'searchResult', results: getSearchResult(rooms_array) })
                if (isEndGame(room)) {
                    room = resetRoomSpec(room)
                    io.sockets.in(room.name).emit('action', { type: 'END_GAME', room: room })
                }
            }
            if (action.type == 'server/gameStart') {
                let room = getGame(action.playerName, rooms_array);
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
            if (action.type == 'server/boucle') {
                let room = getGame(action.name, rooms_array);
                room = fall_piece(room, action.id)
                updateRoomArray(room, rooms_array)
                io.sockets.in(room.name).emit('action', { type: 'GAME_START', room: room })
                socket.broadcast.emit('action', { type: 'searchResult', results: getSearchResult(rooms_array) })
                if (isEndGame(room)) {
                    room = resetRoomSpec(room)
                    io.sockets.in(room.name).emit('action', { type: 'END_GAME', room: room })
                }
            }
            if (action.type == "server/keyUp") {
                let room = getGame(action.name, rooms_array);
                room = keyUp(room, socket.id)

                io.sockets.in(room.name).emit('action', { type: 'GAME_START', room: room })
                socket.broadcast.emit('action', { type: 'searchResult', results: getSearchResult(rooms_array) })
                updateRoomArray(room, rooms_array)
                if (isEndGame(room)) {
                    room = resetRoomSpec(room)
                    io.sockets.in(room.name).emit('action', { type: 'END_GAME', room: room })
                }
            }
        })

        socket.on('disconnect', function () {
            let room = getGameWithId(socket.id, rooms_array)
            if (room)
                socket.leave(room.name)
            let player = removePlayer("", socket.id, rooms_array)
            if (room && isEndGame(room)) {
                room = resetRoomSpec(room)
                io.sockets.in(room.name).emit('action', { type: 'END_GAME', room: room })
            }
            if (room)
                emit_to_room(room, io)
            socket.broadcast.emit('action', { type: 'searchResult', results: getSearchResult(rooms_array) })
            if (player == null)
                console.log("Unknown User Disconnected");
            else
                console.log("User disconnected : ", player)
            console.log(rooms_array)
        })
    })
}

function resetRoomSpec(room) {
    room.status = "waiting"
    for (let i in room.players) {
        room.players[i].hit = false
        room.players[i].spec = false
        room.players[i].loose = false
        room.players[i].currentPiece = 0
    }
    return room
}

function isEndGame(room) {
    for (let i in room.players) {
        if (room.players[i].loose == false)
            return false
    }
    return true
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
