function checkWin(grid) {
  // Define all winning combinations (indices of the 3x3 grid)
  const winConditions = [
    [0, 1, 2], // Row 1
    [3, 4, 5], // Row 2
    [6, 7, 8], // Row 3
    [0, 3, 6], // Column 1
    [1, 4, 7], // Column 2
    [2, 5, 8], // Column 3
    [0, 4, 8], // Diagonal top-left to bottom-right
    [2, 4, 6], // Diagonal top-right to bottom-left
  ];

  console.log(grid);

  // Check each winning condition
  for (let condition of winConditions) {
    const [a, b, c] = condition;
    if (grid[a] !== null && grid[a] === grid[b] && grid[b] === grid[c]) {
      return grid[a]; // Return the winner ('x' or 'o')
    }
  }

  // Check if the game is a draw (no null values left and no winner)
  if (!grid.includes(null)) {
    return "draw";
  }

  // Game is not finished yet
  return null;
}

exports.getRandomItem = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

exports.usernames = [
  "NeonXMaster",
  "TicTacGlow",
  "BrightOBlaster",
  "GridNeonNinja",
  "TicToeSpark",
  "LuminousXKing",
  "NeonOTron",
  "GlowGridGuru",
  "TicTacFlash",
  "RadiantXBandit",
  "PulseTicLord",
  "NeonGridWiz",
  "XOGlowPhantom",
  "TicTacBlaze",
  "ShineOStriker",
  "VividXChamp",
  "GlowTicVoyage",
  "NeonEdgeRuler",
  "TicToeFlicker",
  "BrightGridAce",
];

exports.lobbyInterval = (lobby) => {
  lobby.totalTime -= 1000;

  // Skip the turn
  if (lobby.totalTime <= 0) {
    lobby.totalMoves++;
    lobby.totalTime = 10000;
    const gridIdx = lobby.gameGrid.reduce((acc, val, idx) => {
      if (!val) acc.push(idx);
      return acc;
    }, []);

    const randomIdx = gridIdx[Math.floor(Math.random() * gridIdx.length)];
    lobby.gameGrid[randomIdx] = lobby.curMove;
    lobby.curMove = lobby.curMove === "X" ? "O" : "X";

    let isEnded = null;
    if (lobby.totalMoves > 4) isEnded = checkWin(lobby.gameGrid);

    lobby.players.forEach((pl) => {
      let result = null;

      const player = `${pl.move !== lobby.curMove ? "You" : pl.username}`;
      let message = `${player} Exceeded Time Limit - Selecting Random Move!`;
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
        action: "skip-turn",
        data: {
          game: {
            grid: lobby.gameGrid,
            curMove: lobby.curMove,
            totalTime: !result ? lobby.totalTime : 5000,
            timeLimit: lobby.timeLimit,
            result,
          },
          message,
        },
      });
    });

    if (isEnded) {
      clearInterval(lobby.intervalID);

      let totalTime = 5000;

      lobby.intervalID = setInterval(() => {
        totalTime -= 1000;
        lobby.players.forEach((pl) => {
          pl.sendToClient({
            action: "update-time",
            data: { totalTime: totalTime },
          });

          if (totalTime <= 0) {
            clearInterval(lobby.intervalID);
            pl.sendToClient({
              action: "reset-game",
              data: { move: pl.move },
            });
          }
        });
      }, 1000);

      lobby.totalMoves = 0;
      lobby.curMove = "X";
      lobby.isGameStarted = false;
      lobby.gameGrid = [null, null, null, null, null, null, null, null, null];
      lobby.totalTime = 10000;
    }
  } else {
    lobby.players.forEach((pl) => {
      pl.sendToClient({
        action: "update-time",
        data: { totalTime: lobby.totalTime },
      });
    });
    // Update total time to client
  }
};
exports.checkWin = checkWin;
