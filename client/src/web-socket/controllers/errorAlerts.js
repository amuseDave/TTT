export default function errorAlerts({ type, store, uiActions, gameActions, data }) {
  if (type === "user-left") {
    store.dispatch(gameActions.changePlayer2Username(null));

    setTimeout(() => {
      store.dispatch(uiActions.setMenuUserLeftError(data.message));
    }, 300);
  }
}
