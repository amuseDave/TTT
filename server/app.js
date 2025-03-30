const { WebSocketServer } = require("ws");

const wss = new WebSocketServer({ port: 8080 });

//wss.clients
wss.on("connection", (ws) => {
  ws.on("message", (req) => {
    const { action, data } = JSON.parse(req.toString("utf-8"));
    console.log("Action: ", action, "Data: ", data);

    if (action === "start-lobby") {
      ws.send(JSON.stringify({ action: "start-lobby", data: null }));
    }
  });
  ws.on("error", console.log);
});
