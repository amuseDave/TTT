const { lobbies } = require("../models/Lobby");

module.exports = (ws, data) => {
  if (!ws.lobbyID) return;

  const lobby = lobbies.getLobby(ws.lobbyID);
  const player = lobby.removePlayer(ws.playerID);

  if (lobby.players.length < 1) {
    lobbies.lobbies.delete(ws.lobbyID);
    return;
  }

  if (lobby.isGameStarted) {
    lobby.isGameStarted = false;
    lobby.curMove = "X";
    lobby.gameGrid = [null, null, null, null, null, null, null, null, null];
  }

  lobby.players[0].isAdmin = true;
  lobby.players[0].sendToClient({
    action: "display-alert",
    type: "user-left",
    data: { message: `${player[0].username} left the lobby`, alert: "error" },
  });
};
