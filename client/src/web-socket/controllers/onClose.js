export default function onClose(e, { store, uiActions, gameActions }) {
  console.log("On Close event");
  const {
    ui: { isJoiningLobby, isFindingLobby, isPrivacyLoading, isStartingGame },
    game: { isAdmin },
  } = store.getState();

  if (!isAdmin) store.dispatch(gameActions.changeAdmin(true));

  if (isStartingGame) store.dispatch(uiActions.isStartingGame(false));
  if (isFindingLobby) store.dispatch(uiActions.isFindingLobby(false));

  store.dispatch(uiActions.isConnectedServer(false));

  if (isPrivacyLoading) store.dispatch(uiActions.isPrivacyLoading(false));
  if (isJoiningLobby) {
    history.pushState({}, null, "/");
    store.dispatch(uiActions.isJoiningLobby(false));
    store.dispatch(uiActions.setStartError("Couldn't Connect To the Server"));
  }
}
