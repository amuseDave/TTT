export default function skipTurn({ store, uiActions, gameActions, data }) {
  const message = "Time Limit Exceeded - selecting random move!";

  store.dispatch(uiActions.setGameAlert({ type: "error", message }));
  store.dispatch(gameActions.updateServerGame(data));
  store.dispatch(uiActions.isWaitingRes(false));
}
