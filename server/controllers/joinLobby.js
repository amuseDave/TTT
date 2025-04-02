const { v4: uuidv4 } = require("uuid");
const { lobbies } = require("../models/Lobby");
const { Player } = require("../models/Player");

module.exports = (ws, data) => {
  if (ws.lobbyID || typeof data.lobbyID !== "string") return;

  const lobby = lobbies.getLobby(data.lobbyID);

  if (!lobby || lobby.players.length > 1) {
    return ws.send(JSON.stringify({ action: "join-lobby", data: null }));
  }

  const existingPlayer = lobby.players[0];
  const move = existingPlayer.move === "X" ? "O" : "X";
  const newPlayer = new Player(ws.send.bind(ws), uuidv4(), false, move);
  lobby.addPlayer(newPlayer);

  ws.lobbyID = lobby.lobbyID;
  ws.playerID = newPlayer.playerID;
  ws.isAdmin = newPlayer.isAdmin;

  newPlayer.sendToClient({
    action: "join-lobby",
    data: {
      player1: newPlayer.username,
      player2: existingPlayer.username,
      isAdmin: false,
      move,
      lobbyID: lobby.lobbyID,
    },
    type: "new-user",
  });
  existingPlayer.sendToClient({
    action: "join-lobby",
    data: { username: newPlayer.username },
    type: "user-joined",
  });
};
