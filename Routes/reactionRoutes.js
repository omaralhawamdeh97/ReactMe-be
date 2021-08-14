//express
const express = require("express");
const passport = require("passport");
const upload = require("../Middlewares/multer");

//Controllers
const { createReaction } = require("../Controllers/reactionControllers");

const router = express.Router();
router.post(
  "/reactions/new",
  upload.single("video"),
  passport.authenticate("jwt", { session: false }),
  createReaction
);

module.exports = router;
