import setupSettings from './settings.js';

Hooks.once('ready', () => {
  setupSettings(game, game.i18n.localize.bind(game.i18n));
});

function setFixedInitiative(combatant) {
  const tokenNameValuesString = game.settings.get('fix-init-for-name', 'tokenNameValues');
  const tokenNameValues = parseTokenNameValues(tokenNameValuesString);

  const tokenName = combatant.token?.name;
  const initiativeValue = tokenNameValues[tokenName];

  if (initiativeValue !== undefined) {
    combatant.initiative = Number(initiativeValue);
    combatant.rollResultLabel = `${combatant.initiative}`;
  }
}

function parseTokenNameValues(tokenNameValuesString) {
  const tokenNameValues = {};
  const pairs = tokenNameValuesString.split(',');

  for (const pair of pairs) {
    const [name, value] = pair.trim().split(':');
    if (name && value) {
      tokenNameValues[name] = value;
    }
  }

  return tokenNameValues;
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
  const tokenNameValuesString = game.settings.get('fix-init-for-name', 'tokenNameValues');
  const tokenNameValues = parseTokenNameValues(tokenNameValuesString);

  if (isInitiativeRoll && tokenNameValues[message.speaker.alias] !== undefined) {
    return false;
  }
});