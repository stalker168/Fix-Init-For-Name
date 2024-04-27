export default function setupSettings(foundryGame, localize) {
    foundryGame.settings.register('fix-init-for-name', 'tokenName', {
      name: localize('FIX-INIT-FOR-NAME.TokenName'),
      hint: localize('FIX-INIT-FOR-NAME.TokenNameHint'),
      scope: 'world',
      config: true,
      type: String,
      default: ''
    });
  
    foundryGame.settings.register('fix-init-for-name', 'initiativeValue', {
      name: localize('FIX-INIT-FOR-NAME.InitiativeValue'),
      hint: localize('FIX-INIT-FOR-NAME.InitiativeValueHint'),
      scope: 'world',
      config: true,
      type: Number,
      default: 20
    });
}