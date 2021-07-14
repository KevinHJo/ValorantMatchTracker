import {Data} from './data';
import {Match} from './match';
import {Round} from './round';
import {Content} from './content';

let data = new Data();
// console.dir(data); // FOR DEVELOPMENT USE
const content = new Content();
let match = new Match(data);
let round = new Round(data, 0)
let selectedPlayer;
let playerStats;
let currentGun;


document.addEventListener("DOMContentLoaded", () => {
    addTextToParent('.map-name', `${match.map}`)
    addTextToParent('.match-length', `${match.matchLength}`)
    addTextToParent('.match-length', ' mins')
    buildRoundSelector(data);
    renderCorrectMap(match);

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
        listItem.addEventListener('click', () => {
            currentRound(i);
        });
    }
};

function currentRound(i) {
    round = new Round(data, i - 1);
    loadRoundData(round);
    console.dir(round)
    renderRoundData();
}

function loadRoundData(round) {
    playerStats = round.getPlayerStat(selectedPlayer.puuid)
    console.dir(playerStats)
}

function renderMap(url) {
    let container = document.querySelector('.map');
    let map = document.createElement('img');
    map.setAttribute('src', url);
    map.setAttribute('alt', '../assets/Ascent.png')
    container.appendChild(map);
}

function renderCorrectMap(match) {
    let url;
    switch (match.map) {
        case 'Ascent':
            url = '../assets/Ascent.png';
            break;
    }
    renderMap(url)
}

function renderRoundData() {
    renderKills();
    if (round.plantLocation.x) {
        renderSpike();
    }
    renderGunList();
    renderKda();
}


function renderKills() {
    let locations = loadSelectedKills();
    
    console.dir(locations);
}

function loadSelectedKills() {
    let kills = playerStats.kills;
    let victims = [];
    let player = [];
    if (kills.length) {
        kills.forEach( kill => {
            victims.push(kill.victimLocation)
            let currentPlayer = kill.playerLocations.filter(loc => {
                return loc.puuid === selectedPlayer.puuid;
            });
            player.push(currentPlayer[0].location);
        });
    };

    return {'victims': victims, 'player': player}
}

function renderSpike() {
    let location = round.plantLocation;
}

function renderGunList() {
    let gunList = loadGunList();
    console.dir(gunList);
    let container = document.querySelector('.gun-list');
    removeAllChildNodes(container);
    gunList.forEach(gun => {
        let listItem = document.createElement('li');
        let gunName = document.createTextNode(`${gun.name}`);
        listItem.appendChild(gunName);
        container.appendChild(listItem);
    });
}

function loadGunList() {
    let equips = [];
    playerStats.kills.forEach(kill => {
        let weapon = content.findEquipById(kill.finishingDamage.damageItem)
        if (!equips.includes(weapon)) {
            equips.push(content.findEquipById(weapon.id)); 
        }
    });
    return equips;
}

function addPlayersToTeam(team, ul) {
    team.forEach(player => {
        console.dir(player);
        let newPlayer = document.createElement('ul');
        addAgentPortrait(newPlayer, player);
        addName(newPlayer, player);
        addKda(newPlayer, player);
        
        ul.appendChild(newPlayer);

        newPlayer.addEventListener('click', () => {
            setCurrentPlayer(player);
        });
    });
};

function addAgentPortrait(parent, player) {
    let agent = content.findAgentById(player.characterId)
    let url;
    switch (agent.name) {
        case 'Astra':
            url = '../assets/agents/Astra_icon.png';
            break;
        case 'Breach':
            url = '../assets/agents/Breach_icon.png';
            break;
        case 'Brimstone':
            url = '../assets/agents/Brimstone_icon.png';
            break;
        case 'Cypher':
            url = '../assets/agents/Cypher_icon.png';
            break;
        case 'Jett':
            url = '../assets/agents/Jett_icon.png';
            break;
        case 'KAYO':
            url = '../assets/agents/KAYO_icon.png';
            break;
        case 'Killjoy':
            url = '../assets/agents/Killjoy_icon.png';
            break;
        case 'Omen':
            url = '../assets/agents/Omen_icon.png';
            break;
        case 'Phoenix':
            url = '../assets/agents/Phoenix_icon.png';
            break;
        case 'Raze':
            url = '../assets/agents/Raze_icon.png';
            break;
        case 'Reyna':
            url = '../assets/agents/Reyna_icon.png';
            break;
        case 'Sage':
            url = '../assets/agents/Sage_icon.png';
            break;
        case 'Skye':
            url = '../assets/agents/Skye_icon.png';
            break;
        case 'Sova':
            url = '../assets/agents/Sova_icon.png';
            break;
        case 'Viper':
            url = '../assets/agents/Viper_icon.png';
            break;
        case 'Yoru':
            url = '../assets/agents/Yoru_icon.png';
            break;
    }

    let img = document.createElement('img');
    img.setAttribute('src', url);
    parent.appendChild(img);
}

function addKda(parent, player) {
    let stats = player.stats;
    let text = document.createTextNode(`${stats.kills}/${stats.deaths}/${stats.assists}`)
}

function addName(parent, player) {
    let nameItem = document.createElement('li');
    let name = data.findPlayerByPuuid(player.puuid)[0].gameName;
    let text = document.createTextNode(name)
    nameItem.appendChild(text);
    parent.appendChild(nameItem);
}

function addTextToParent(parentClass, child) {
    let container = document.querySelector(parentClass)
    const text = document.createTextNode(child)
    container.appendChild(text)
};



function setCurrentPlayer(player) {
    selectedPlayer = player;
    currentRound(round.roundNum + 1);
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}