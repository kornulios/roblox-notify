const express = require("express");
const app = express();
const port = 1902;

// const wss = require('ws');
var WebSocketClient = require("websocket").client;
var client = new WebSocketClient();


client.on("connect", (connection) => {
  // connection.on("message", (message) => {
  //   console.log(message);
  // });

  app.get('/', (req, res) => {
    connection.send('MESSAGE FROM ROBLOX');
    res.send('OK')
  })
});

client.connect("ws://localhost:3000/", "echo-protocol");

app.listen(port, () => {
  console.log("Server listening on port", port);
});
