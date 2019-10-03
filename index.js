// code away!
const express = require("express");

const server = require("./server");

const port = 7000;

server.get("/", (req, res) => {
  res.send("It's Working!");
});
server.listen(port, () => {
  console.log("API is listening");
});
