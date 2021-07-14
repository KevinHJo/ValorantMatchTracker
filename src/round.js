export class Round {
    constructor(data, num) {
        this.roundNum = num;
        this.plantLocation = data.game.roundResults[num].defuseLocation;
        this.defuseLocation = data.game.roundResults[num].defuseLocation;
        this.roundResult = data.game.roundResults[num].roundResult;
        this.plantSite = data.game.roundResults[num].plantSite;
        this.playerStats = data.game.roundResults[num].playerStats;
    }

    getPlayerStat(puuid) {
        return this.playerStats.filter(player => {
            return player.puuid === puuid;
        })[0];
    }

    
}