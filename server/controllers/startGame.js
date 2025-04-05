const { lobbies } = require("../models/Lobby");

module.exports = (ws) => {
  if (!ws.lobbyID) return;

  const lobby = lobbies.getLobby(ws.lobbyID);

  if (lobby.isGameStarted) return;

  const player = lobby.getPlayer(ws.playerID);

  if (!ws.isAdmin) {
    if (player.isAdmin) ws.isAdmin = true;
  }
  if (!ws.isAdmin) return;

  lobby.players.forEach((player) => {
    player.sendToClient();
  });
};
