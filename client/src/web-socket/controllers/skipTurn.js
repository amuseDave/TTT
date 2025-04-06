export default function skipTurn({ store, uiActions, gameActions, data }) {
  const {
    player1Move,
    player2,
    player1,
    game: { curMove },
  } = store.getState().game;

  const message = `Time Limit exeeded, ${
    player1Move === curMove ? player1 : player2
  } random move selected!`;

  store.dispatch(uiActions.setGameAlert({ type: "error", message }));
  store.dispatch(gameActions.updateServerGame(data));
}
