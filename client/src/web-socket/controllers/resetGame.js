export default function resetGame({ store, gameActions, uiActions, data }) {
  store.dispatch(uiActions.isWaitingRes(false));
  store.dispatch(gameActions.resetGame(data));
}
