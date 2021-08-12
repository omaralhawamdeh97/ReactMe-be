//express
const express = require("express");
const passport = require("passport");
const upload = require("../Middlewares/multer");

//Controllers
const { createPost, getPosts } = require("../Controllers/postControllers");

const router = express.Router();
router.post(
  "/posts/new",
  upload.single("video"),
  passport.authenticate("jwt", { session: false }),
  createPost
);

router.get(
  "/posts",
  passport.authenticate("jwt", { session: false }),
  getPosts
);

module.exports = router;
