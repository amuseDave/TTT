import store from "./store";
import { gameActions } from "./gameSlicer";
import { audioRef } from "./App";
import { startLobbyIntervalID } from "./components/StartLobbyBtn";

const webSocket = new WebSocket(import.meta.env.VITE_CONNECTION_URL);

webSocket.onopen = () => {
  store.dispatch(gameActions.webSocketConnection(false));

  webSocket.onmessage = async (event) => {
    const { action, data } = JSON.parse(event.data);
    console.log("Action: ", action, "Data: ", data);

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
  // Handle Reload the page in 5 seconds with redux dispatch to indicate with UI
};

export default webSocket;
