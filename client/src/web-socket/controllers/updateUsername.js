export default function updateUsername({ data, store, gameActions }) {
  store.dispatch(gameActions.changePlayer2Username(data.username));
}
