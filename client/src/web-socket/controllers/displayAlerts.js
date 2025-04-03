export default function errorAlerts({ type, store, uiActions, gameActions, data }) {
  if (type === "user-left") {
    store.dispatch(gameActions.changePlayer2Username(null));

    store.dispatch(uiActions.setMenuAlert({ type: "error", message: data.message }));
  } else if (type === "user-joined") {
    store.dispatch(gameActions.changePlayer2Username(data.username));
    store.dispatch(uiActions.setMenuAlert({ type: "success", message: data.message }));
  }
}
