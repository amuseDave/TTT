import store from "./store";
import { gameActions } from "./gameSlicer";

const webSocket = new WebSocket(import.meta.env.VITE_CONNECTION_URL);

webSocket.onopen = () => {
  webSocket.onmessage = (event) => {
    const { action } = JSON.parse(event.data);
    console.log(action);

    if (action === "start-lobby") store.dispatch(gameActions.startLobbyClient());
  };
};

export default webSocket;
