const { usernames, getRandomItem } = require("../utils");

class Player {
  constructor(send, playerID, isAdmin, move) {
    this.send = send;
    this.playerID = playerID;
    this.isAdmin = isAdmin;
    this.move = move;
    this.username = getRandomItem(usernames);
  }

  sendToClient(data) {
    console.log("sending data: ", data);

    this.send(JSON.stringify(data));
  }

  changeUsername(username) {
    this.username = username;
  }
}

exports.Player = Player;
