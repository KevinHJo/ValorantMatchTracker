export class Content {
    constructor() {
        this.data = require('../assets/content.json');
        this.characters = this.data.characters;
        this.equips = this.data.equips;
    }

    findAgentById(id) {
        return this.characters.filter(character => {
            return character.id === id.toUpperCase();
        })[0];
    }

    findEquipById(id) {
        return this.equips.filter(character => {
            return character.id === id;
        })[0];
    }

    addAgentPortrait(parent, player) {
        let agent = this.findAgentById(player.characterId)
        let url;
        switch (agent.name) {
            case 'Astra':
                url = './assets/agents/Astra_icon.png';
                break;
            case 'Breach':
                url = './assets/agents/Breach_icon.png';
                break;
            case 'Brimstone':
                url = './assets/agents/Brimstone_icon.png';
                break;
            case 'Cypher':
                url = './assets/agents/Cypher_icon.png';
                break;
            case 'Jett':
                url = './assets/agents/Jett_icon.png';
                break;
            case 'KAYO':
                url = './assets/agents/KAYO_icon.png';
                break;
            case 'Killjoy':
                url = './assets/agents/Killjoy_icon.png';
                break;
            case 'Omen':
                url = './assets/agents/Omen_icon.png';
                break;
            case 'Phoenix':
                url = './assets/agents/Phoenix_icon.png';
                break;
            case 'Raze':
                url = './assets/agents/Raze_icon.png';
                break;
            case 'Reyna':
                url = './assets/agents/Reyna_icon.png';
                break;
            case 'Sage':
                url = './assets/agents/Sage_icon.png';
                break;
            case 'Skye':
                url = './assets/agents/Skye_icon.png';
                break;
            case 'Sova':
                url = './assets/agents/Sova_icon.png';
                break;
            case 'Viper':
                url = './assets/agents/Viper_icon.png';
                break;
            case 'Yoru':
                url = './assets/agents/Yoru_icon.png';
                break;
        }
    
        let img = document.createElement('img');
        img.setAttribute('src', url);
        parent.appendChild(img);
    }

    addWeaponIcon(name, parent) {
        let url;
        switch (name) {
            case 'Ares':
                url = './assets/weapons/Ares_icon.png';
                break;
            case 'Bucky':
                url = './assets/weapons/Bucky_icon.png';
                break;
            case 'Bulldog':
                url = './assets/weapons/Bulldog_icon.png';
                break;
            case 'Classic':
                url = './assets/weapons/Classic_icon.png';
                break;
            case 'Frenzy':
                url = './assets/weapons/Frenzy_icon.png';
                break;
            case 'Ghost':
                url = './assets/weapons/Ghost_icon.png';
                break;
            case 'Golden Gun':
                url = './assets/weapons/Golden Gun_icon.png';
                break;
            case 'Guardian':
                url = './assets/weapons/Guardian_icon.png';
                break;
            case 'Judge':
                url = './assets/weapons/Judge_icon.png';
                break;
            case 'Knife':
                url = './assets/weapons/Knife_icon.png';
                break;
            case 'Marshal':
                url = './assets/weapons/Marshal_icon.png';
                break;
            case 'Odin':
                url = './assets/weapons/Odin_icon.png';
                break;
            case 'Operator':
                url = './assets/weapons/Operator_icon.png';
                break;
            case 'Phantom':
                url = './assets/weapons/Phantom_icon.png';
                break;
            case 'Sheriff':
                url = './assets/weapons/Sheriff_icon.png';
                break;
            case 'Shorty':
                url = './assets/weapons/Shorty_icon.png';
                break;
            case 'Spectre':
                url = './assets/weapons/Spectre_icon.png';
                break;
            case 'Stinger':
                url = './assets/weapons/Stinger_icon.png';
                break;
            case 'Vandal':
                url = './assets/weapons/Vandal_icon.png';
                break;
        };

        this.renderWeapon(url, parent);
    }

    renderWeapon(url, parent) {
        let img = document.createElement('img');
        img.setAttribute('src', url);
        parent.appendChild(img);
    }

}