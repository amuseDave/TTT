export default function joinLobby({ data, type, store, gameActions, uiActions }) {
  // If user has joined update for current user his username
  if (type === "user-joined") {
    store.dispatch(gameActions.changePlayer2Username(data.username));
  } else {
    // Update ui to remove loader for finishing joining
    store.dispatch(uiActions.isJoining(false));

    // If Lobby not found
    if (!data) {
      history.pushState({}, null, "/");
      return;
    }

    if (type === "new-user") {
      store.dispatch(gameActions.initiateLobbyClient(data));
    }
  }
}
