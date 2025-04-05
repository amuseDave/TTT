export default function startGame({ store, gameActions, uiActions }) {
  store.dispatch(uiActions.isStartingGame(false));
  store.dispatch(gameActions.initiateClientGame(true));
}
