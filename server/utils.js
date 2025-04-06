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
    lobby.totalTime = 10000;
    const gridIdx = lobby.gameGrid.reduce((acc, val, idx) => {
      if (!val) acc.push(idx);
      return acc;
    }, []);

    if (gridIdx.length === 1) {
      // Handle tie or win game
      //
      // Select random index of grid if the turn was skipped
    } else {
      const randomIdx = gridIdx[Math.floor(Math.random() * gridIdx.length)];
      lobby.gameGrid[randomIdx] = lobby.curMove;
      lobby.curMove = lobby.curMove === "X" ? "O" : "X";
      lobby.players.forEach((pl) => {
        pl.sendToClient({
          action: "skip-turn",
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
