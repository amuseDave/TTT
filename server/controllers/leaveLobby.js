const { lobbies } = require("../models/Lobby");

module.exports = (ws, data) => {
  if (!ws.lobbyID) return;

  const lobby = lobbies.removeLobby(ws.lobbyID, ws.playerID);

  if (!lobby) return;

  console.log("handle one player in the lobby left");
};
