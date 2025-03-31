import store from "./store";
import { gameActions } from "./gameSlicer";
import { audioRef } from "./components/AudioAndTitle";
import { uiActions } from "./uiSlicer";

const webSocket = new WebSocket(import.meta.env.VITE_CONNECTION_URL);

webSocket.onopen = () => {
  store.dispatch(uiActions.webSocketConnection(false));

  webSocket.onmessage = async (event) => {
    const { action, data } = JSON.parse(event.data);
    console.log("Action: ", action, "Data: ", data);

    if (action === "start-lobby") startLobby(data);
    if (action === "switch-moves") switchMoves(data);
  };
};

webSocket.onerror = () => {
  console.log("error");
  setTimeout(() => {
    location.href = "";
  }, 5000);
  // Handle Reload the page in 5 seconds with redux dispatch to indicate with UI
};

export default webSocket;

function startLobby(data) {
  store.dispatch(gameActions.startLobbyClient(data));
  if (audioRef) {
    audioRef.pause();
    audioRef.currentTime = 0.5;
    audioRef.play();
  }
}

function switchMoves(data) {
  store.dispatch(gameActions.changePlayerMoves(data));
  store.dispatch(uiActions.switchingMoves(false));
}
