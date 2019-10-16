
import { Player } from '../player/Player'

export class Game{
    constructor(roomName, player){
        this.name = roomName;
        this.players = [];
        this.rules = [];
        this.players.push(player)
    }

    addPlayer(player){
        this.players.push(player)
    }

    isPlayerInGame(playerName){
        for (let i = 0; i < this.players.length; i++){
            if (this.players[i].name == playerName){
                return 1;
            }
        }
        return null;
    }

    getGM(){
        for (let i = 0; i < this.players.length; i++){
            if (this.players[i].gameMaster == 1)
                return this.players[i].name;
        }
        return null
    }

    removePlayer(playerName = "", socketID = ""){
        let player;
        if (playerName.length == 0){
            for (let i = 0; i < this.players.length; i++){
                if (this.players[i].socketID == socketID){
                    player = this.players[i];
                    this.players.shift(i, 1)
                    return player
                }
            }
        }
        else{
            for (let j = 0; j < this.players.length; j++){
                if (this.players[j].name == playerName){
                    player = this.players[j];
                    this.players.shift(j, 1)
                    return player
                }
            }
        }
        return null;
    }
}

export function joinGame(roomName, playerName, playerSocket, games_array){
    if (games_array.length == 0)
        games_array[0] = new Game(roomName, new Player(playerName, playerSocket, [], 1));
    else{
        for (let i  = 0; i < games_array.length; i++){
            if (games_array[i].name == roomName){
                games_array[i].addPlayer(new Player(playerName, playerSocket, [], 0))
                return games_array;
            }
        }
        games_array.push(new Game(roomName, new Player(playerName, playerSocket, [], 1)))
    }
    return games_array;
}

export function getGame(playerName, games_array){
    for (let i = 0; i < games_array.length; i++){
        if (games_array[i].isPlayerInGame(playerName) != null)
            return games_array[i]
    }
    return null;
}

export function getSearchResult(rooms_array){
    if (rooms_array.length == 0)
        return null;
    let search_result = [];
    for (let i = 0; i < rooms_array.length; i++){
        search_result.push({
            "roomName": rooms_array[i].name,
            "players": rooms_array[i].players.length,
            "gameMaster": rooms_array[i].getGM()
        })
    }
    return search_result;
}

export function removePlayer(playerName = "", socketID = "", games_array){
    let player;
    for (let i = 0; i < games_array.length; i++){
        player = games_array[i].removePlayer(playerName, socketID)        
        if (player == null)
            i++;
        else{
            if (games_array[i].players.length == 0)
                games_array.shift(i, 1);
            return player
        }
    }
    return null
}
