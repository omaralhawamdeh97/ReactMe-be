//express
const express = require("express");

//Controllers
const { createPost, getPosts } = require("../Controllers/postControllers");

const router = express.Router();
router.post("/createPost", createPost);
// router.get("/:userId/posts", getPosts);

module.exports = router;
