export class Data {
    constructor() {
        this.players = require('../assets/players.json');
        this.game = require('../assets/game.json');
    }

    findPlayerByPuuid(puuid) {
        return this.players.filter(player => {
            return player.puuid === puuid;
        })
    }
};