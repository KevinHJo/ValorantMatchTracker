export class Match {
    constructor(data) {
        this.matchLength = Math.floor(data.game.matchInfo.gameLengthMillis / 60000 );
        this.map = data.game.matchInfo.mapId.slice(18);
        this.players = data.game.players;
    };

    getPlayersByTeam(team) {
        return this.players.filter(player => {
            return player.teamId === team;
        });
    };
}