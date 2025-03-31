const { lobbies } = require("../models/Lobby");

module.exports = (ws) => {
  if (!ws.lobbyID || !ws.isAdmin || ws.gameStarted) return;

  const lobby = lobbies.getLobby(ws.lobbyID);
  console.log(lobby);

  lobby.players.forEach((player) => {
    player.move = player.move === "X" ? "O" : "X";
    player.sendToClient({ action: "switch-moves", data: { move: player.move } });
  });
};
