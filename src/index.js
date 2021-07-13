import {Data} from './data';
import {Match} from './match';
import {Round} from './round';

let data = new Data();
console.dir(data); // FOR DEVELOPMENT USE
let match = new Match(data);
console.dir(match)
let round = new Round(data, 1)
console.dir(round);
let stats = 'bsldfkja;l';

document.addEventListener("DOMContentLoaded", () => {
    addTextToParent('.map-name', `${match.map}`)
    addTextToParent('.match-length', `${match.matchLength}`)
    addTextToParent('.match-length', ' mins')
    buildRoundSelector(data);

    const blueTeam = match.getPlayersByTeam('BLUE');
    const redTeam = match.getPlayersByTeam('RED');
    const teamOne = document.querySelector('.team-1');
    const teamTwo = document.querySelector('.team-2');
    addPlayersToTeam(blueTeam, teamOne);
    addPlayersToTeam(redTeam, teamTwo);
});

function buildRoundSelector(data) {
    const roundSelector = document.querySelector('.round-selector');
    for (let i=1; i <= data.game.roundResults.length; i++) {
        let listItem = document.createElement('li');
        let roundNumber = document.createTextNode(i.toString());
        listItem.appendChild(roundNumber);
        roundSelector.appendChild(listItem);
        listItem.addEventListener('click', () => currentRound(i));
    }
};

function currentRound(i) {
    round = new Round(data, i - 1);
    console.log(round.roundNum)
}

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
};

function addTextToParent(parentClass, child) {
    let container = document.querySelector(parentClass)
    const text = document.createTextNode(child)
    container.appendChild(text)
};

function addPlayersToTeam(team, ul) {
    team.forEach(player => {
        let newPlayer = document.createElement('ul');
        let nameItem = document.createElement('li');
        let name = data.findPlayerByPuuid(player.puuid)[0].gameName;
        let text = document.createTextNode(name)
        nameItem.appendChild(text);
        newPlayer.appendChild(nameItem);
        ul.appendChild(newPlayer);
        newPlayer.addEventListener('click', sayHi)
    });
};

function sayHi() {
    console.log('hi');
}
