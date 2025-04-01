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
