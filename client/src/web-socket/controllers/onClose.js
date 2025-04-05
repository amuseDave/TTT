export default function onClose(e, { store, uiActions, gameActions }) {
  console.log("On Close event");
  const {
    ui: { isJoiningLobby, isConnectedServer, isFindingLobby, isPrivacyLoading },
    game: { isAdmin },
  } = store.getState();

  if (!isAdmin) store.dispatch(gameActions.changeAdmin(true));
  if (isFindingLobby) store.dispatch(uiActions.isFindingLobby(false));
  if (isConnectedServer && e.reason !== "from-server-to-client")
    store.dispatch(uiActions.isConnectedServer(false));
  if (isPrivacyLoading) store.dispatch(uiActions.isPrivacyLoading(false));
  else if (isJoiningLobby) {
    history.pushState({}, null, "/");
    store.dispatch(uiActions.isJoiningLobby(false));
    store.dispatch(uiActions.setStartError("Couldn't Connect To the Server"));
  }
}
