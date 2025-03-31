const { lobbies } = require("../models/Lobby");

module.exports = (ws, data) => {
  if (!ws.lobbyID || ws.gameStarted) return;
  if (typeof data.username !== "string") return;
  if (data.username.length < 3 || data.username.length > 15) return;

  const lobby = lobbies.getLobby(ws.lobbyID);

  lobby.players.forEach((player) => {
    if (player.playerID === ws.playerID) {
      player.username = data.username;
    } else {
      player.sendToClient({
        action: "update-username",
        data: { username: data.username },
      });
    }
  });
};
