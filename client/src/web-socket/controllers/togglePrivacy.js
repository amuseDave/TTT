export default function togglePrivacy({ data, uiActions, store, gameActions }) {
  store.dispatch(uiActions.isPrivacyLoading(false));
  store.dispatch(gameActions.changePrivacy(data.isPrivate));
}
