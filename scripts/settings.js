export default function setupSettings(foundryGame, localize) {
  foundryGame.settings.register('fix-init-for-name', 'tokenNameValues', {
    name: localize('FIX-INIT-FOR-NAME.TokenNameValues'),
    hint: localize('FIX-INIT-FOR-NAME.TokenNameValuesHint'),
    scope: 'world',
    config: true,
    type: String,
    default: ''
  });
}