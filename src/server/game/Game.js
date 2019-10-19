
import { Player } from '../player/Player'

export class Game {
    constructor(roomName, player, priv) {
        this.name = roomName;
        this.stop = undefined;
        this.priv = priv;
        this.Pieces = [];
        this.players = [];
        this.rules = [
            false, //speedrun:
            true, //juniorBoard:
            false, //scoremode:
            false //bubbleTiles:
        ];
        this.players.push(player)
        this.status = 'waiting'
    }

    addPlayer(player) {
        this.players.push(player)
    }

    isPlayerInGame(playerName) {
        for (let i = 0; i < this.players.length; i++) {
            if (this.players[i].name == playerName) {
                return 1;
            }
        }
        return null;
    }

    isSocketInGame(playerName) {
        for (let i = 0; i < this.players.length; i++) {
            if (this.players[i].socketID == playerName) {
                return 1;
            }
        }
        return null;
    }

    getGM() {
        for (let i = 0; i < this.players.length; i++) {
            if (this.players[i].gameMaster == 1)
                return this.players[i].name;
        }
        return null
    }

    changeParam(val, id) {
        this.rules[id] = val;
    }

    removePlayer(playerName = "", socketID = "") {
        let player;
        let master = false;
        if (playerName.length == 0) {
            for (let i = 0; i < this.players.length; i++) {
                if (this.players[i].socketID == socketID) {
                    if (this.players[i].gameMaster == 1) {
                        master = true;
                    }
                    player = this.players[i];
                    this.players.shift(i, 1)
                    if (master && this.players.length != 0)
                        this.players[0].gameMaster = 1

                    return player
                }
            }
        }
        else {
            for (let j = 0; j < this.players.length; j++) {
                if (this.players[j].name == playerName) {
                    if (this.players[j].gameMaster == 1) {
                        master = true;
                    }
                    player = this.players[j];
                    this.players.shift(j, 1)
                    if (master && this.players.length != 0)
                        this.players[0].gameMaster = 1
                    return player
                }
            }
        }
        return null;
    }
}

export function joinGame(roomName, playerName, playerSocket, games_array, priv) {
    if (games_array.length == 0)
        games_array[0] = new Game(roomName, new Player(playerName, playerSocket, [], 1), priv);
    else {
        for (let i = 0; i < games_array.length; i++) {
            if (games_array[i].name == roomName) {
                games_array[i].addPlayer(new Player(playerName, playerSocket, [], 0))
                return games_array;
            }
        }
        games_array.push(new Game(roomName, new Player(playerName, playerSocket, [], 1), priv))
    }
    return games_array;
}

export function getGame(playerName, games_array) {
    for (let i = 0; i < games_array.length; i++) {
        if (games_array[i].isPlayerInGame(playerName) != null)
            return games_array[i]
    }
    return null;
}

export function isMasterInRoom(playerName, room) {
    for (let i = 0; i < games_array.length; i++) {
        if (games_array[i].isPlayerInGame(playerName) != null)
            return games_array[i]
    }
    return null;
}

export function getGameWithId(socketId, games_array) {
    for (let i = 0; i < games_array.length; i++) {
        if (games_array[i].isSocketInGame(socketId) != null)
            return games_array[i]
    }
    return null;
}

export function getSearchResult(rooms_array) {
    if (rooms_array.length == 0)
        return null;
    let search_result = [];
    for (let i = 0; i < rooms_array.length; i++) {
        console.log(rooms_array[i].priv)
        if (rooms_array[i].priv == false)
            search_result.push({
                "roomName": rooms_array[i].name,
                "players": rooms_array[i].players.length,
                "gameMaster": rooms_array[i].getGM()
            })
    }
    return search_result;
}

export function removePlayer(playerName = "", socketID = "", games_array) {
    let player;
    for (let i = 0; i < games_array.length; i++) {
        player = games_array[i].removePlayer(playerName, socketID)
        if (player == null)
            i++;
        else {
            if (games_array[i].players.length == 0) {
                if (games_array[i].stop)
                    clearInterval(games_array[i].stop)
                games_array.shift(i, 1);
            }
            return player
        }
    }
    return null
}

export function getGameWithNameRoom(name, rooms) {
    for (let i in rooms) {
        if (rooms[i].name == name) {
            return (rooms[i])
        }
    }
}

export function GameChangeParam(val, id, name, rooms) {
    let room = getGameWithNameRoom(name, rooms)
    room.changeParam(val, id);
}


export function updateRoomArray(r, rooms) {
    for (let i in rooms) {
        if (rooms[i].name == r.name) {
            rooms[i] = r
            return (rooms[i])
        }
    }
}
