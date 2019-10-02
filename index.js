// code away!
const express = require("express");
const server = express();
const userRouter = require("./users/userRouter");
const postRouter = require("./posts/postRouter");
server.use(express.json());
server.use("/user", userRouter);
server.use("/post", postRouter);
const port = 7000;

server.get("/", (req, res) => {
  res.send("It's Working!");
});
server.listen(port, () => {
  console.log("API is listening");
});
