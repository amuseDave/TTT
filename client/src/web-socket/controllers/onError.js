export default function onError({ store, uiActions, gameActions }) {
  console.log("On error event");

  const {
    ui: { isJoiningLobby, isConnectingServer },
    game: { isAdmin },
  } = store.getState();

  if (!isAdmin) store.dispatch(gameActions.changeAdmin(true));

  if (isConnectingServer) store.dispatch(uiActions.isConnectingServer(false));
  if (isJoiningLobby) {
    history.pushState({}, null, "/");
    store.dispatch(uiActions.isJoiningLobby(false));
    store.dispatch(uiActions.setStartError("Couldn't Connect To the Server"));
  }
}
