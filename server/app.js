const { WebSocketServer } = require("ws");
const startLobby = require("./controllers/startLobby.js");
const switchMoves = require("./controllers/switchMoves.js");
const { joinLobby } = require("./controllers/joinLobby.js");
const leaveLobby = require("./controllers/leaveLobby.js");
const updateUsername = require("./controllers/updateUsername.js");
const findLobby = require("./controllers/findLobby.js");
const togglePrivacy = require("./controllers/togglePrivacy.js");
const startGame = require("./controllers/startGame.js");

const wss = new WebSocketServer({ port: 8080 });

//wss.clients
wss.on("connection", (ws) => {
  ws.on("message", (req) => {
    try {
      const { action, data } = JSON.parse(req.toString("utf-8"));
      console.log("Action: ", action, "Data: ", data);

      if (action === "update-username") updateUsername(ws, data);
      else if (action === "switch-moves") switchMoves(ws);
      else if (action === "start-lobby") startLobby(ws, data);
      else if (action === "join-lobby") joinLobby(ws, data);
      else if (action === "toggle-privacy") togglePrivacy(ws);
      else if (action === "find-lobby") findLobby(ws);
      else if (action === "start-game") startGame(ws);
    } catch (err) {
      ws.send(JSON.stringify({ action: "error", data: { msg: err.message } }));
    }
  });
  ws.on("close", () => {
    leaveLobby(ws);
  });
  ws.on("error", console.log);
});
wss.on("error", (e) => console.log(e));
