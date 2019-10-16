
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
