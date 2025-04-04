export default function displayAlerts({ type, store, uiActions, gameActions, data }) {
  if (type === "user-left") {
    store.dispatch(gameActions.changePlayer2Username(null));
  } else if (type === "user-joined") {
    store.dispatch(uiActions.isFindingLobby(false));
    store.dispatch(gameActions.changePlayer2Username(data.username));
  }

  if (type === "find-lobby") {
    store.dispatch(uiActions.isFindingLobby(false));
  }

  store.dispatch(uiActions.setMenuAlert({ type: data.alert, message: data.message }));
}
