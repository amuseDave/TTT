export default function skipTurn({ store, uiActions, gameActions, data }) {
  store.dispatch(uiActions.setGameAlert({ type: "error", message: data.message }));
  store.dispatch(gameActions.updateServerGame(data));
  store.dispatch(uiActions.isWaitingRes(false));
}
