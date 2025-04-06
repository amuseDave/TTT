const { lobbies } = require("../models/Lobby");
const { lobbyInterval } = require("../utils");

module.exports = (ws, data) => {
  if (!ws.lobbyID) return;
  const lobby = lobbies.getLobby(ws.lobbyID);
  if (!lobby.isGameStarted) return;

  const player = lobby.getPlayer(ws.playerID);
  if (lobby.curMove !== player.move) return;

  if (lobby.gameGrid[data.idx] || lobby.gameGrid[data.idx] === undefined) return;

  if (lobby.intervalID) {
    clearInterval(lobby.intervalID);
    setInterval(() => {
      lobbyInterval(lobby);
    }, 1000);
  }

  lobby.totalTime = 10000;
  lobby.totalTime -= 1000;

  lobby.gameGrid[data.idx] = lobby.curMove;
  lobby.curMove = lobby.curMove === "X" ? "O" : "X";

  lobby.players.forEach((pl) => {
    pl.sendToClient({
      action: "update-game",
      data: {
        game: {
          grid: lobby.gameGrid,
          curMove: lobby.curMove,
          totalTime: lobby.totalTime,
          timeLimit: lobby.timeLimit,
        },
      },
    });
  });
};
