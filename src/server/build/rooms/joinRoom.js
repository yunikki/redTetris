"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createRoom(roomName, playerName, playerSocket) {
    var room = {
        "roomName": roomName,
        "players": [
            {
                "socket": playerSocket,
                "grid": null,
                "playerName": playerName,
                "gameMaster": 1
            }
        ]
    };
    return room;
}
function addPlayer(playerName, room, playerSocket) {
    //TODO Check player name isnt same that existing one in the room
    room.players.push({
        "socket": playerSocket,
        "grid": null,
        "playerName": playerName,
        "gameMaster": 0
    });
    return room;
}
function joinRoom(roomName, playerName, playerSocket, rooms_array) {
    console.log("Socket: ", playerSocket);
    var room_joined = -1;
    if (rooms_array.length == 0)
        rooms_array[0] = createRoom(roomName, playerName, playerSocket);
    else {
        for (var i = 0; i < rooms_array.length; i++) {
            if (rooms_array[i].roomName == roomName) {
                room_joined = i;
                break;
            }
        }
        if (room_joined == -1)
            rooms_array.push(createRoom(roomName, playerName, playerSocket));
        else
            rooms_array[i] = addPlayer(playerName, rooms_array[i], playerSocket);
    }
    return rooms_array;
}
exports.joinRoom = joinRoom;
function getRoom(playerName, rooms_array) {
    for (var i = 0; i < rooms_array.length; i++) {
        for (var j = 0; j < rooms_array[i].players.length; j++) {
            if (rooms_array[i].players[j].playerName == playerName) {
                return (rooms_array[i]);
            }
        }
    }
    return null;
}
exports.getRoom = getRoom;
function getGM(players) {
    for (var j = 0; j < players.length; j++) {
        if (players[j].gameMaster == 1)
            return players[j].playerName;
    }
    return null;
}
function getSearchResult(rooms_array) {
    if (rooms_array.length == 0)
        return null;
    var search_result = [];
    for (var i = 0; i < rooms_array.length; i++) {
        search_result.push({
            "roomName": rooms_array[i].roomName,
            "players": rooms_array[i].players.length,
            "gameMaster": getGM(rooms_array[i].players)
        });
    }
    return search_result;
}
exports.getSearchResult = getSearchResult;
