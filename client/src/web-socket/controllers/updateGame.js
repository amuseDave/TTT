export default function updateGame({ gameActions, store, data }) {
  store.dispatch(gameActions.updateServerGame(data));
}
