const express = require("express");
const userDb = require("./userDb");

const router = express.Router();

router.post("/", (req, res) => {
  const body = req.body;
  if (!body.name) {
    res.status(400).json({ message: "Name is required" });
  } else {
    userDb
      .insert(body)
      .then(user => {
        res.status(201).json(user);
      })
      .catch(error => {
        res
          .status(500)
          .json({ errorMessage: "There is an error with the server" });
      });
  }
});

router.post("/:id/posts", (req, res) => {});

router.get("/", (req, res) => {
  userDb
    .get()
    .then(user => {
      res.send(user);
    })
    .catch(error => {
      res
        .status(500)
        .json({ errorMessage: "There is an error connecting to the server" });
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  userDb
    .getById(id)
    .then(user => {
      if (!user) {
        res
          .status(400)
          .json({ message: "There is no user associate with this ID" });
      } else {
        res.json(user);
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ errorMessage: "There is an error connecting to the server" });
    });
});

router.get("/:id/posts", (req, res) => {
  const userId = req.params.id;
  userDb
    .getUserPosts(userId)
    .then(user => {
      if (!user.length > 0) {
        res
          .status(404)
          .json({ message: "There is no user associate with this ID" });
      } else {
        res.json(user);
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ errorMessage: "There is an error connecting to the server" });
    });
});

router.delete("/:id", (req, res) => {
  const deleteId = req.params.id;
  userDb
    .remove(deleteId)
    .then(user => {
      if (!user) {
        res
          .status(404)
          .json({ message: "There is no user associated with this ID" });
      } else {
        res.json(user);
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ errorMessage: "There is an error connecting to the server" });
    });
});

router.put("/:id", (req, res) => {
  const updateId = req.params.id;
  const updateUser = req.body;
  if (!updateUser.name) {
    res.status(400).json({ message: "Name is required in update" });
  } else {
    userDb
      .update(updateId, updateUser)
      .then(user => {
        if (!user) {
          res
            .status(404)
            .json({ message: "There is no user associated with this ID" });
        } else {
          res.status(200).json(user);
        }
      })
      .catch(error => {
        res
          .status(500)
          .json({ message: "There is an error connecting to the server" });
      });
  }
});

//custom middleware

function validateUserId(req, res, next) {}

function validateUser(req, res, next) {}

function validatePost(req, res, next) {}

module.exports = router;
