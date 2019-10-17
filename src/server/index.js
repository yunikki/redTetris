import fs from 'fs'
import debug from 'debug'
import p from './pieces/classPieces'
import { getSearchResult } from './game/Game'
import { Player } from './player/Player'
import { Game, joinGame, getGame, removePlayer, getGameWithId, isMasterInRoom } from './game/Game'


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
            if (action.type === 'server/piecesSolo') {
                socket.emit('action', { type: 'newPiece', piece: p.getPieces() })
            }
            if (action.type === 'server/creatRoom') {
                rooms_array = joinGame(action.roomName, action.playerName, action.socketID, rooms_array);
                let room = getGame(action.playerName, rooms_array)
                console.log(room);
                socket.emit('action', { type: 'joinRoom', room: room, master: 2 })
                socket.broadcast.emit('action', { type: 'joinRoom', room: room, master: 2 })

                socket.emit('action', { type: 'searchResult', results: getSearchResult(rooms_array) })
                socket.broadcast.emit('action', { type: 'searchResult', results: getSearchResult(rooms_array) })
            }
            if (action.type == 'server/searchRoom') {
                console.log("Searching for room ", getSearchResult(rooms_array))
                socket.emit('action', { type: 'searchResult', results: getSearchResult(rooms_array) })
            }
            if (action.type == 'server/removePlayerFromRoom') {
                let room = getGame(action.playerName, rooms_array)
                let removedPlayer = removePlayer(action.playerName, "", rooms_array);
                socket.emit('action', { type: 'joinRoom', room: undefined, master: false })
                if (room)
                    emit_to_room(room, io)

                socket.emit('action', { type: 'searchResult', results: getSearchResult(rooms_array) })
                socket.broadcast.emit('action', { type: 'searchResult', results: getSearchResult(rooms_array) })
                console.log(removedPlayer, rooms_array)
            }
            //io.emit('searchingResult', {results: getSearchResult(rooms_array)}) Broadcast qui va pop sur tout les clients a chaque changement dans le back
        })

        socket.on('disconnect', function () {
            let room = getGameWithId(socket.id, rooms_array)
            let player = removePlayer("", socket.id, rooms_array)
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
