const { lobbies } = require("../models/Lobby");

module.exports = (ws, data) => {
  if (!ws.lobbyID) return;

  const lobby = lobbies.removeLobby(ws.lobbyID, ws.playerID);

  if (!lobby) return;
  lobby.players[0].isAdmin = true;
  lobby.players[0].sendToClient({ action: "update-username", data: { username: null } });
};
