const { lobbies } = require("../models/Lobby");
const { lobbyInterval, checkWin } = require("../utils");

module.exports = (ws, data) => {
  if (!ws.lobbyID) return;
  const lobby = lobbies.getLobby(ws.lobbyID);
  if (!lobby.isGameStarted) return;

  const player = lobby.getPlayer(ws.playerID);
  if (lobby.curMove !== player.move) return;

  if (lobby.gameGrid[data.idx] || lobby.gameGrid[data.idx] === undefined) return;

  lobby.totalMoves++;
  lobby.totalTime = 10000;

  lobby.gameGrid[data.idx] = lobby.curMove;
  lobby.curMove = lobby.curMove === "X" ? "O" : "X";

  if (lobby.intervalID) {
    clearInterval(lobby.intervalID);
  }

  let isEnded = null;

  if (lobby.totalMoves > 4) isEnded = checkWin(lobby.gameGrid);

  lobby.players.forEach((pl) => {
    let result = null;
    if (isEnded) {
      result =
        isEnded === "draw"
          ? "draw"
          : isEnded === pl.move
          ? "win"
          : !isEnded
          ? null
          : "loss";
      pl.move = pl.move === "X" ? "O" : "X";
      setTimeout(() => {
        pl.sendToClient({ action: "switch-moves", data: { move: pl.move } });
      }, 1000);
    }

    pl.sendToClient({
      action: "update-game",
      data: {
        game: {
          grid: lobby.gameGrid,
          curMove: lobby.curMove,
          totalTime: lobby.totalTime,
          timeLimit: lobby.timeLimit,
          result,
        },
      },
    });
  });

  if (isEnded) {
    lobby.totalMoves = 0;
    lobby.curMove = "X";
    lobby.isGameStarted = false;
    lobby.gameGrid = [null, null, null, null, null, null, null, null, null];
    lobby.totalTime = 10000;
  } else {
    lobby.intervalID = setInterval(() => {
      lobbyInterval(lobby);
    }, 1000);
  }
};
