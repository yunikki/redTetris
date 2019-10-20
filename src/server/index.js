import fs from 'fs'
import debug from 'debug'
import { pieces, getPieces, setNewPieceInGridForAll, setNewPieceInGrid, fall_piece, floorPiece, featherDrop, moveLeft, moveRight } from './pieces/classPieces'
import { getSearchResult } from './game/Game'
import { Player } from './player/Player'
import { Game, joinGame, getGame, removePlayer, getGameWithId, GameChangeParam, getGameWithNameRoom, updateRoomArray } from './game/Game'


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
                socket.emit('action', { type: 'joinRoom', room: room, master: 2 })
                socket.broadcast.emit('action', { type: 'joinRoom', room: room, master: 2 })
                socket.emit('action', { type: 'searchResult', results: getSearchResult(rooms_array) })
                socket.broadcast.emit('action', { type: 'searchResult', results: getSearchResult(rooms_array) })
            }
            if (action.type == 'server/searchRoom') {
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

                for (let i in room.players) {
                    io.to(room.players[i].socketID).emit('action', { type: 'GAME_START', room: room, grid: room.players[i].grid, next: room.Pieces[room.players[i].currentPiece + 1].piece })
                }
                room.stop = setInterval(() => {
                    room = fall_piece(room)
                    updateRoomArray(room, rooms_array)
                    for (let i in room.players) {
                        io.to(room.players[i].socketID).emit('action', { type: 'GAME_START', room: room, grid: room.players[i].grid, next: room.Pieces[room.players[i].currentPiece + 1].piece })
                    }
                }, 500);
                updateRoomArray(room, rooms_array)
            }
            if (action.type == 'server/keySpace') {
                let room = getGame(action.name, rooms_array);
                room = floorPiece(room, socket.id)

                for (let i in room.players) {
                    io.to(room.players[i].socketID).emit('action', { type: 'GAME_START', room: room, grid: room.players[i].grid, next: room.Pieces[room.players[i].currentPiece + 1].piece })
                }
                room.stop = setInterval(() => {
                    room = fall_piece(room)
                    updateRoomArray(room, rooms_array)
                    for (let i in room.players) {
                        io.to(room.players[i].socketID).emit('action', { type: 'GAME_START', room: room, grid: room.players[i].grid, next: room.Pieces[room.players[i].currentPiece + 1].piece })
                    }
                }, 500);
                updateRoomArray(room, rooms_array)
            }
            if (action.type == 'server/keyleft') {
                let room = getGame(action.name, rooms_array);
                console.log(action.name)
                room = moveLeft(room, socket.id)
                //      for (let i in room.players) {
                //        if (room.players[i].socketID == socket.id)
                //          socket.emit('action', { type: 'GAME_START', room: room, grid: room.players[i].grid, next: room.Pieces[room.players[i].currentPiece + 1].piece })
                //  }
                updateRoomArray(room, rooms_array)
            }
            if (action.type == 'server/keyRight') {
                let room = getGame(action.name, rooms_array);
                console.log(action.name)
                room = moveRight(room, socket.id)
                //      for (let i in room.players) {
                //        if (room.players[i].socketID == socket.id)
                //          socket.emit('action', { type: 'GAME_START', room: room, grid: room.players[i].grid, next: room.Pieces[room.players[i].currentPiece + 1].piece })
                //  }
                updateRoomArray(room, rooms_array)
            }
            if (action.type == 'server/gameStart') {
                let room = getGame(action.playerName, rooms_array);
                let socketRoom = getGameWithNameRoom(room.name, rooms_array)
                let new_room = []
                room.Pieces.push(new pieces())
                room.Pieces.push(new pieces())
                if (!room)
                    return (undefined)
                socketRoom = setNewPieceInGridForAll(room)
                if (room) {
                    for (let i in socketRoom.players) {
                        io.to(socketRoom.players[i].socketID).emit('action', { type: 'GAME_START', room: room, grid: socketRoom.players[i].grid, next: socketRoom.Pieces[socketRoom.players[i].currentPiece + 1].piece })
                        //n'emit rien
                    }
                }
                socketRoom.status = "runing"
                socketRoom.stop = setInterval(() => {
                    socketRoom = fall_piece(socketRoom)
                    updateRoomArray(socketRoom, rooms_array)
                    for (let i in socketRoom.players) {
                        io.to(socketRoom.players[i].socketID).emit('action', { type: 'GAME_START', room: room, grid: socketRoom.players[i].grid, next: socketRoom.Pieces[socketRoom.players[i].currentPiece + 1].piece })
                    }
                }, 500);
                updateRoomArray(socketRoom, rooms_array)
            }
        })

        socket.on('disconnect', function () {
            let room = getGameWithId(socket.id, rooms_array)
            let player = removePlayer("", socket.id, rooms_array)
            console.log(room, player);
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
