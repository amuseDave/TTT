export default function onClose({ store, uiActions, gameActions }) {
  console.log("On Close event");
  const {
    ui: { isJoiningLobby, isConnectedServer },
    game: { isAdmin },
  } = store.getState();

  if (!isAdmin) store.dispatch(gameActions.changeAdmin(true));

  if (isConnectedServer) store.dispatch(uiActions.isConnectedServer(false));
  else if (isJoiningLobby) {
    history.pushState({}, null, "/");
    store.dispatch(uiActions.isJoiningLobby(false));
    store.dispatch(uiActions.setStartError("Couldn't Connect To the Server"));
  }
}
