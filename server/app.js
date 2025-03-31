const { WebSocketServer } = require("ws");
const startLobby = require("./controllers/startLobby.js");
const switchMoves = require("./controllers/switchMoves.js");

const wss = new WebSocketServer({ port: 8080 });

//wss.clients
wss.on("connection", (ws) => {
  ws.on("message", (req) => {
    try {
      const { action, data } = JSON.parse(req.toString("utf-8"));
      console.log("Action: ", action, "Data: ", data);

      if (action === "start-lobby") startLobby(ws);
      if (action === "switch-moves") switchMoves(ws);
    } catch (error) {
      console.log(error);
    }
  });
  ws.on("error", console.log);
});
wss.on("error", (e) => console.log(e));
