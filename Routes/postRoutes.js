//express
const express = require("express");
const passport = require("passport");
const upload = require("../Middlewares/multer");

//Controllers
const {
  createPost,
  getPosts,
  getPublicPosts,
} = require("../Controllers/postControllers");

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

router.get("/posts/:page/public", getPublicPosts);
module.exports = router;
