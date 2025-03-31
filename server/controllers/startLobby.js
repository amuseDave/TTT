const { v4: uuidv4 } = require("uuid");
const { Lobby, lobbies } = require("../models/Lobby");
const { Player } = require("../models/Player");

module.exports = (ws) => {
  if (ws.lobbyID) return;

  const player = new Player(ws.send.bind(ws), uuidv4(), true, "X");
  const lobby = new Lobby(uuidv4());

  const playerID = player.playerID;
  const isAdmin = player.isAdmin;
  const move = player.move;
  const lobbyID = lobby.lobbyID;

  lobby.addPlayer(player);
  lobbies.addLobby(lobbyID, lobby);

  ws.lobbyID = lobbyID;
  ws.playerID = playerID;
  ws.isAdmin = isAdmin;
  ws.gameStarted = false;

  lobby.players[0].sendToClient({
    action: "start-lobby",
    data: { lobbyID, username: player.username },
  });
};
