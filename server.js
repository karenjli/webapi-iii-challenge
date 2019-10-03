const express = require("express");
const userRouter = require("./users/userRouter");
const postRouter = require("./posts/postRouter");
const server = express();

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} to ${req.path}`);
  next();
}

server.use(logger);
server.use(express.json());
server.use("/user", userRouter);
server.use("/post", postRouter);

module.exports = server;
