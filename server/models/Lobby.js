class Lobbies {
  constructor() {
    this.lobbies = new Map();
  }
  addLobby(lobbyID, lobbyData) {
    this.lobbies.set(lobbyID, lobbyData);
  }
  removeLobby(lobbyID) {
    this.lobbies.delete(lobbyID);
  }
  getLobby(lobbyID) {
    return this.lobbies.get(lobbyID);
  }
}

class Lobby {
  constructor(lobbyID) {
    this.lobbyID = lobbyID;
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
    console.log("removing player");
  }
}

exports.lobbies = new Lobbies();

exports.Lobby = Lobby;
