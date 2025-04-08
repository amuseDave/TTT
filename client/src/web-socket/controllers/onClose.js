export default function onClose(e, { store, uiActions, gameActions }) {
  const {
    ui: {
      isJoiningLobby,
      isFindingLobby,
      isPrivacyLoading,
      isStartingGame,
      isWaitingRes,
      player2,
    },
    game: { isAdmin },
  } = store.getState();

  if (!isAdmin) store.dispatch(gameActions.changeAdmin(true));

  if (isStartingGame) store.dispatch(uiActions.isStartingGame(false));
  if (isFindingLobby) store.dispatch(uiActions.isFindingLobby(false));
  if (isWaitingRes) store.dispatch(uiActions.isWaitingRes(false));
  if (player2) store.dispatch(gameActions.changePlayer2Username(null));

  store.dispatch(uiActions.isConnectedServer(false));

  if (isPrivacyLoading) store.dispatch(uiActions.isPrivacyLoading(false));
  if (isJoiningLobby) {
    history.pushState({}, null, "/");
    store.dispatch(uiActions.isJoiningLobby(false));
    store.dispatch(uiActions.setStartError("Couldn't Connect To the Server"));
  }
}
