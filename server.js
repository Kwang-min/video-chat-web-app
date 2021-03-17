const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);


app.get('/', (req, res) => {
    res.redirect(`/${uuidV4()}`)
  })

server.listen(8000, () => console.log('server is running on port 8000'));

