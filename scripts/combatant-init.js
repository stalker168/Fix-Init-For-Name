import setupSettings from './settings.js';

Hooks.once('ready', () => {
  setupSettings(game, game.i18n.localize.bind(game.i18n));
});

function setFixedInitiative(combatant) {
  const tokenName = game.settings.get('fix-init-for-name', 'tokenName');
  const initiativeValue = game.settings.get('fix-init-for-name', 'initiativeValue');

  if (combatant.token?.name === tokenName) {
    combatant.initiative = Number(initiativeValue);
    combatant.rollResultLabel = `${combatant.initiative}`;
  }
}

Hooks.on('createCombatant', async (combatant) => {
  setFixedInitiative(combatant);
  await combatant.update({ initiative: combatant.initiative });
});

Hooks.on('dnd5e.rollInitiative', async function(actor, combatants) {
  for (const combatant of combatants) {
    setFixedInitiative(combatant);
    await combatant.update({ initiative: combatant.initiative });
  }
});

Hooks.on('updateCombatant', async (combatant, changes) => {
  setFixedInitiative(combatant);
  await combatant.update({ initiative: combatant.initiative });
});

Hooks.on('preCreateChatMessage', (message) => {
  const isInitiativeRoll = message.flags?.core?.initiativeRoll;
  const tokenName = game.settings.get('fix-init-for-name', 'tokenName');

  if (isInitiativeRoll && message.speaker.alias === tokenName) {
    return false;
  }
});