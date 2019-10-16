
export class Player{
    constructor(playerName, playerSocketID, grid, gameMaster){
        this.name = playerName;
        this.socketID = playerSocketID;
        this.grid = grid;
        this.gameMaster = gameMaster;
    }
}