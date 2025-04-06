export default function updateGame({ gameActions, store, data, uiActions }) {
  store.dispatch(gameActions.updateServerGame(data));
  store.dispatch(uiActions.isWaitingRes(false));
}
