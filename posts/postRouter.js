const express = require("express");
const postDb = require("./postDb");

const router = express.Router();

router.get("/", (req, res) => {
  postDb
    .get()
    .then(post => {
      res.send(post);
    })
    .catch(error => {
      res
        .status(500)
        .json({ errorMessage: "There are errors connecting to the server." });
    });
});

router.get("/:id", (req, res) => {
  const postId = req.params.id;
  postDb
    .getById(postId)
    .then(post => {
      if (!post) {
        res.status(404).json({
          errorMessage: "The post with the specified ID does not exist",
        });
      } else {
        res.status(200).json(post);
      }
    })
    .catch(error => {
      res.status(500).json({ errorMessage: "Connection with server error" });
    });
});

router.delete("/:id", (req, res) => {
  const deleteId = req.params.id;
  postDb
    .remove(deleteId)
    .then(post => {
      if (!post) {
        res.status(404).json({
          errorMessage: "The post with the specified ID does not exisat",
        });
      } else {
        res.json(post);
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ errorMessage: "There is an error with the server" });
    });
});

router.put("/:id", (req, res) => {
  const updateId = req.params.id;
  const updateBody = req.body;
  if (!updateBody.text) {
    res.status(404).json({ message: "Text is required for updates" });
  } else {
    postDb
      .update(updateId, updateBody)
      .then(post => {
        res.status(200).json(post);
      })
      .catch(error => {
        res
          .status(500)
          .json({ errorMessage: "There is an error with the server" });
      });
  }
});

// custom middleware

function validatePostId(req, res, next) {}

module.exports = router;
