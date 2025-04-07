export function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export const usernames = [
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

export function playAudio(audio, currentTime = 0) {
  if (audio) {
    audio.pause();
    audio.currentTime = currentTime;
    audio.play();
  }
}

export function checkWin(grid) {
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

  // Check each winning condition
  for (let i = 0; i < winConditions.length; i++) {
    const [a, b, c] = winConditions[i];
    if (grid[a] !== null && grid[a] === grid[b] && grid[b] === grid[c]) {
      return { state: grid[a], pattern: i };
    }
  }

  // Check if the game is a draw (no null values left and no winner)
  if (!grid.includes(null)) {
    return { state: "draw", pattern: null };
  }

  // Game is not finished yet
  return null;
}
