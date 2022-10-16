const express = require("express");
const WebSocketServer = require("websocket").server;
const http = require("http");
const app = express();
const port = 1902;

app.use(express.text());

var server = http.createServer(function (request, response) {});

server.listen(3000, function () {
  console.log(new Date() + " Server is listening on port 3000");
});

var wsServer = new WebSocketServer({
  httpServer: server,
  // autoAcceptConnections: false,
});

app.listen(port, () => {
  console.log("Server listening on port", port);
});

wsServer.on("request", (request) => {
  var connection = request.accept("echo-protocol");
  console.log(new Date() + " Connection accepted.");

  connection.on("message", function (message) {
    if (message.type === "utf8") {
      console.log("Received Message: " + message.utf8Data);
      connection.send(message.utf8Data);
    } else if (message.type === "binary") {
      console.log("Received Binary Message of " + message.binaryData.length + " bytes");
      connection.sendBytes(message.binaryData);
    }
  });

  connection.on("close", function (reasonCode, description) {
    console.log(new Date() + " Peer " + connection.remoteAddress + " disconnected.");
  });

});

app.post("/", (req, res) => {
  console.log(req.body)
  wsServer.broadcast(req.body);
  res.send("OK");
});
