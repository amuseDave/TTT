export default function joinLobby({ data, store, gameActions, uiActions }) {
  // Update ui to remove loader for finishing joining
  store.dispatch(uiActions.isJoiningLobby(false));

  // If Lobby not found
  if (!data) {
    store.dispatch(uiActions.setStartError("Couldn't find a lobby"));
    history.pushState({}, null, "/");
  } else store.dispatch(gameActions.initiateLobbyClient(data));
}
