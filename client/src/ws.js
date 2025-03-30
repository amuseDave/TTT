import store from "./store";
import { gameActions } from "./gameSlicer";
import { audioRef } from "./App";
import { startLobbyIntervalID } from "./components/StartLobbyBtn";

const webSocket = new WebSocket(import.meta.env.VITE_CONNECTION_URL);

webSocket.onopen = () => {
  store.dispatch(gameActions.webSocketConnection(false));

  webSocket.onmessage = (event) => {
    const { action } = JSON.parse(event.data);
    console.log(action);

    if (action === "start-lobby") {
      store.dispatch(gameActions.startLobbyClient());
      if (startLobbyIntervalID) clearInterval(startLobbyIntervalID);
      if (audioRef) {
        audioRef.pause();
        audioRef.currentTime = 0.5;
        audioRef.play();
      }
    }
  };
};

webSocket.onerror = () => {
  console.log("error");
  setTimeout(() => {
    location.href = "";
  }, 5000);
  // Reload the page in 5 seconds with dispatch and UI
};

export default webSocket;
