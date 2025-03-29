const { WebSocketServer } = require("ws");

const wss = new WebSocketServer({ port: 8080 });

//wss.clients
wss.on("connection", (ws) => {
  ws.on("error", console.log);

  ws.on("message", (data, isBinary) => {
    const { action } = JSON.parse(data.toString("utf-8"));
    if (action === "start-lobby") ws.send(JSON.stringify({ action: "start-lobby" }));
  });
});
