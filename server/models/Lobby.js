class Lobbies {
  constructor() {
    this.lobbies = new Map();
  }
  addLobby(lobbyID, lobbyData) {
    this.lobbies.set(lobbyID, lobbyData);
  }
  getLobby(lobbyID) {
    return this.lobbies.get(lobbyID);
  }
}

class Lobby {
  constructor(lobbyID) {
    this.isGameStarted = false;
    this.lobbyID = lobbyID;
    this.isPrivate = true;
    this.players = [];
    this.gameGrid = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];
  }

  addPlayer(player) {
    this.players.push(player);
  }

  removePlayer(playerID) {
    const playerIdx = this.players.findIndex((player) => player.playerID === playerID);
    return this.players.splice(playerIdx, 1);
  }
  getPlayer(playerID) {
    return this.players.find((player) => player.playerID === playerID);
  }
}

exports.lobbies = new Lobbies();

exports.Lobby = Lobby;
