const express = require("express");
const userDb = require("./userDb");
const postDb = require("../posts/postDb");

const router = express.Router();

router.post("/", validateUser, (req, res) => {
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

router.post("/:id/posts", validatePost, (req, res) => {
  const newPost = req.body;
  if (newPost.user_id === 0 || newPost.text === 0) {
    res.status(404).json({ message: "Missing required text field" });
  } else {
    postDb
      .insert(newPost)
      .then(post => {
        res.status(201).json(post);
      })
      .catch(error => {
        res.status(500).json({ errorMessage: "Error with posting text" });
      });
  }
});

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

router.get("/:id", validateUserId, (req, res) => {
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

function validateUserId(req, res, next) {
  const userId = req.params.id;
  userDb
    .getById(userId)
    .then(user => {
      if (!user) {
        res.status(400).json({ message: "Invalid user id" });
      } else {
        next();
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ errorMessage: "Error with validate UserId middleware" });
    });
}

function validateUser(req, res, next) {
  const body = req.body;
  if (!body) {
    res.status(400).json({ message: "missing user data" });
  } else {
    userDb
      .insert(body)
      .then(user => {
        if (user.name === 0) {
          res.status(400).json({ message: "missing required name field" });
        }
      })
      .catch(error => {
        res.status(500).json({ errorMessage: "Error with validate User" });
      });
  }
  next();
}

function validatePost(req, res, next) {
  const body = req.body;
  if (body === 0) {
    res.status(400).json({ message: "missing post data" });
  } else {
    next();
  }
}

module.exports = router;
