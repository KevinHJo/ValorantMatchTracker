import {Data} from './data';
import {Match} from './match';
import {Round} from './round';
import {Content} from './content';
import { mark } from 'regenerator-runtime';

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
        listItem.classList.add('round');
        if (i === 1) {
            listItem.dataset.selected = true;
        }else{
            listItem.dataset.selected = false;
        }
        let roundNumber = document.createTextNode(i.toString());
        listItem.appendChild(roundNumber);
        roundSelector.appendChild(listItem);
        listItem.addEventListener('click', () => {
            currentRound(i, listItem);
        });
    }
};

function currentRound(i, listItem) {
    if (listItem) {
        deselectAllRounds(listItem);
        listItem.dataset.selected = true;
    };
    round = new Round(data, i - 1);
    loadRoundData(round);
    renderRoundData();
}

function deselectAllRounds(round) {
    round.parentNode.childNodes.forEach(child => {
        if (child.nodeName != '#text') {
            child.dataset.selected = false;
        };
    });
}

function loadRoundData(round) {
    playerStats = round.getPlayerStat(selectedPlayer.puuid)
}

function renderMap(url) {
    let container = document.querySelector('.map');
    let map = document.createElement('img');
    map.setAttribute('src', url);
    map.classList.add('map-img');
    map.setAttribute('alt', './assets/Ascent.png')
    container.appendChild(map);
}

function renderCorrectMap(match) {
    let url;
    switch (match.map) {
        case 'Ascent':
            url = './assets/Ascent.png';
            break;
    }
    renderMap(url)
}

function renderRoundData() {
    renderKills();
    renderVictims();
    if (round.plantLocation.x) {
        // console.dir(round.plantLocation);
        renderSpike(round.plantLocation);
    }
    renderGunList();
}

function renderRoundSelectedGun() {
    renderKills();
    renderVictims();
    console.dir(round.plantLocation);
    if (round.plantLocation.x || round.plantLocation.y) {
        renderSpike(round.plantLocation);
    }
}


function renderKills() {
    let locations = loadSelectedKills().player;
    let container = document.querySelector('.map');
    removeAllChildNodes(container);
    renderCorrectMap(match);
    // console.dir(locations);
    locations.forEach(loc => {
        let mark = document.createElement('img')
        mark.classList.add('marker');
        mark.setAttribute('src', './assets/player-mark.png')
        mark.style.left = `${findXCoord(loc.x)}px`;
        mark.style.bottom = `${findYCoord(loc.y)}px`;
        container.appendChild(mark);
    });
}

function findXCoord(x) {
    return ((6200 + x) / 14848) * 1024;
}

function findYCoord(y) {
    return ((2800 - y) / 14848) * 1024;
}

function renderVictims() {
    let locations = loadSelectedKills().victims;
    let container = document.querySelector('.map');
    // console.dir(locations);
    locations.forEach(loc => {
        let mark = document.createElement('img')
        mark.classList.add('marker');
        mark.setAttribute('src', './assets/kill_mark.png')
        mark.style.left = `${findXCoord(loc.x)}px`;
        mark.style.bottom = `${findYCoord(loc.y)}px`;
        container.appendChild(mark);
    });
}

function loadSelectedKills() {
    let kills = playerStats.kills;
    let victims = [];
    let player = [];
    if (kills.length) {
        kills.forEach( kill => {
            if (currentGun && kill.finishingDamage.damageItem === currentGun.id) {
                victims.push(kill.victimLocation)
                let currentPlayer = kill.playerLocations.filter(loc => {
                    return loc.puuid === selectedPlayer.puuid;
                });
                player.push(currentPlayer[0].location);
            }
        });
    };

    return {'victims': victims, 'player': player}
}

function renderSpike(location) {
    let container = document.querySelector('.map')
    let spike = document.createElement('img');
    spike.setAttribute('src', './assets/spike.png')
    spike.classList.add('spike');
    spike.style.left = `${findXCoord(location.x)}px`;
    spike.style.bottom = `${findYCoord(location.y)}px`;
    container.appendChild(spike);

}

function renderGunList() {
    let gunList = loadGunList();
    let container = document.querySelector('.gun-list');
    removeAllChildNodes(container);
    gunList.forEach(gun => {
        let listItem = document.createElement('li');
        listItem.classList = 'gun';
        listItem.dataset.selected = false;
        content.addWeaponIcon(gun.name, listItem);
        container.appendChild(listItem);
        listItem.addEventListener('click', () => {
            setCurrentGun(gun, listItem);
        });
    });
}

function loadGunList() {
    let equips = [];
    playerStats.kills.forEach(kill => {
        let weapon = content.findEquipById(kill.finishingDamage.damageItem)
        if (!equips.includes(weapon) && weapon) {
            equips.push(content.findEquipById(weapon.id)); 
        }
    });
    return equips;
}

function setCurrentGun(gun, listItem) {
    deselectAllGuns(listItem);
    listItem.dataset.selected = true;
    currentGun = gun;
    renderRoundSelectedGun();
}

function deselectAllGuns(gun) {
    gun.parentNode.childNodes.forEach(gun => {
        gun.dataset.selected = false;
    });
}

function addPlayersToTeam(team, ul) {
    team.forEach(player => {
        let newPlayer = document.createElement('ul');
        newPlayer.classList.add('player');
        newPlayer.dataset.selected = false;
        content.addAgentPortrait(newPlayer, player);
        addName(newPlayer, player);
        addKda(newPlayer, player);
        
        ul.appendChild(newPlayer);

        newPlayer.addEventListener('click', () => {
            setCurrentPlayer(newPlayer, player);
        });
    });
};

function addKda(parent, player) {
    let stats = player.stats;
    let text = document.createTextNode(`${stats.kills}/${stats.deaths}/${stats.assists}`)
    let li = document.createElement('li');
    li.classList.add('kda')
    li.appendChild(text)
    parent.appendChild(li);
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

function setCurrentPlayer(container, player) {
    container.parentNode.parentNode.childNodes.forEach(child1 => {
        child1.childNodes.forEach(child2 => {
            if (child2.nodeName != '#text' && child2.className != 'team-labels') {
                child2.dataset.selected = false;
            };
        });
    });
    container.dataset.selected = true;
    selectedPlayer = player;
    currentRound(round.roundNum + 1);
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}