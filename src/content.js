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

}