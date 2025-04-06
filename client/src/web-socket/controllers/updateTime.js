export default function updateTime({ store, gameActions, data }) {
  store.dispatch(gameActions.updateTotalTime(data.totalTime));
}
