import store from "./store";
import { gameActions } from "./gameSlicer";
import { audioRef } from "./components/AudioAndTitle";
import { uiActions } from "./uiSlicer";

const webSocket = new WebSocket(import.meta.env.VITE_CONNECTION_URL);

webSocket.onopen = () => {
  store.dispatch(uiActions.webSocketConnection(false));

  const lobbyID = window.location.pathname.slice(1);
  if (lobbyID) {
    store.dispatch(uiActions.isJoining(true));
    webSocket.send(JSON.stringify({ action: "join-lobby", data: { lobbyID } }));
  }

  webSocket.onmessage = async (event) => {
    const { action, data, type } = JSON.parse(event.data);
    console.log("Action: ", action, "Data: ", data, "Type: ", type);

    if (action === "update-username") updateUsername(data);
    else if (action === "switch-moves") switchMoves(data);
    else if (action === "start-lobby") startLobby(data);
    else if (action === "join-lobby") joinLobby(data, type);
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
  store.dispatch(uiActions.isSwitchingMoves(false));
}

function joinLobby(data, type) {
  if (type === "user-joined") {
    store.dispatch(gameActions.changePlayer2Username(data.username));
  } else {
    // Update ui to remove loader
    store.dispatch(uiActions.isJoining(false));

    // If Lobby not found
    if (!data) {
      history.pushState({}, null, "/");
      return;
    }

    if (type === "new-user") {
      store.dispatch(gameActions.startLobbyClient(data));
    }
  }
}

function updateUsername(data) {
  store.dispatch(gameActions.changePlayer2Username(data.username));
}
