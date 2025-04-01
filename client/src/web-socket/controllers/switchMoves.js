export default function switchMoves({ data, store, gameActions, uiActions }) {
  store.dispatch(gameActions.changePlayerMoves(data));
  store.dispatch(uiActions.isSwitchingMoves(false));
}
