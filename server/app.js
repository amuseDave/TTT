const { WebSocketServer } = require("ws");
const startLobby = require("./controllers/startLobby.js");
const switchMoves = require("./controllers/switchMoves.js");
const joinLobby = require("./controllers/joinLobby.js");
const leaveLobby = require("./controllers/leaveLobby.js");
const updateUsername = require("./controllers/updateUsername.js");

const wss = new WebSocketServer({ port: 8080 });

//wss.clients
wss.on("connection", (ws) => {
  ws.on("message", (req) => {
    try {
      const { action, data } = JSON.parse(req.toString("utf-8"));
      console.log("Action: ", action, "Data: ", data);

      if (action === "update-username") updateUsername(ws, data);
      else if (action === "switch-moves") switchMoves(ws);
      else if (action === "start-lobby") startLobby(ws);
      else if (action === "join-lobby") joinLobby(ws, data);
    } catch (error) {
      console.log(error);
    }
  });
  ws.on("close", () => {
    leaveLobby(ws);
  });
  ws.on("error", console.log);
});
wss.on("error", (e) => console.log(e));
