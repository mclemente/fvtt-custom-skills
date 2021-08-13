import ActorSheet5eCharacter from "../../systems/dnd5e/module/actor/sheets/character.js";
import ActorSheet5eNPC from "../../systems/dnd5e/module/actor/sheets/npc.js";
import { skills } from "./skills.js";

const MODULE_NAME = "custom-skills";
const NEW_HEIGHT = 680 + 20 * Object.keys(skills).length;
Hooks.on('init', function() {
	for (let skill in skills) {
		CONFIG.DND5E.skills[skill] = `${MODULE_NAME}.${skill}`;
	}
});
Hooks.on('setup', () => {
	patchActor5ePreCreate();
	patchActorSheet5eDefaultOptions();
	patchActorSheet5eNPCDefaultOptions();
});
function patchActor5ePreCreate() {
	libWrapper.register(MODULE_NAME, "CONFIG.Actor.entityClass.prototype._preCreate", function patchedPreCreate(wrapped, ...args) {
		wrapped(...args);
		this.data.update({
			data: {
				skills: skills
			}
		});
	}, "WRAPPER");
}
function patchActorSheet5eDefaultOptions() {
	libWrapper.register(MODULE_NAME, "game.dnd5e.applications.ActorSheet5eCharacter.defaultOptions", function patchedDefaultOptions(...args) {
		return mergeObject(Object.getPrototypeOf(ActorSheet5eCharacter).defaultOptions, {
			classes: ["dnd5e", "sheet", "actor", "character"],
			width: 720,
			height: NEW_HEIGHT
		});
	}, "OVERRIDE");
}
function patchActorSheet5eNPCDefaultOptions() {
	libWrapper.register(MODULE_NAME, "game.dnd5e.applications.ActorSheet5eNPC.defaultOptions", function patchedDefaultOptions(...args) {
		return mergeObject(Object.getPrototypeOf(ActorSheet5eNPC).defaultOptions, {
			classes: ["dnd5e", "sheet", "actor", "npc"],
			width: 600,
			height: NEW_HEIGHT
		});
	}, "OVERRIDE");
}
