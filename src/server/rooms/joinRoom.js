
function createRoom(roomName, playerName, playerSocket){
    let room = {
        "roomName": roomName,
        "players": [
            {
                "socketID": playerSocket,
                "grid": null,
                "playerName": playerName,
                "gameMaster": 1
            }
        ]
    }
    return room;
}

function addPlayer(playerName, room, playerSocket){
    //TODO Check player name isnt same that existing one in the room
    room.players.push({
        "socketID": playerSocket,
        "grid": null,
        "playerName": playerName,
        "gameMaster": 0
    })
    return room;
}

export function joinRoom(roomName, playerName, playerSocket, rooms_array){
    console.log("Socket: ", playerSocket)
    let room_joined = -1;
    if (rooms_array.length == 0)
        rooms_array[0] = createRoom(roomName, playerName, playerSocket)
    else{
        for (let i  = 0; i < rooms_array.length; i++){
            if (rooms_array[i].roomName == roomName){
                room_joined = i;
                break ;
            }
        }
        if (room_joined == -1)
            rooms_array.push(createRoom(roomName, playerName, playerSocket))
        else
            rooms_array[i] = addPlayer(playerName, rooms_array[i], playerSocket) 
    }
    return rooms_array;
}

export function getRoom(playerName, rooms_array){
    for (let i = 0; i < rooms_array.length; i++){
        for (let j = 0; j < rooms_array[i].players.length; j++){
            if (rooms_array[i].players[j].playerName == playerName){
                return (rooms_array[i])
            }
        }
    }
    return null;
}
