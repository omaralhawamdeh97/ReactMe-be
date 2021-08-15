const express = require("express");
const passport = require("passport");
const {
  signup,
  signin,
  getFriends,
  getPosts,
} = require("../Controllers/userControllers");
const upload = require("../Middlewares/multer");

const router = express.Router();

router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);
router.post("/signup", signup);
router.get(
  "/friends",
  passport.authenticate("jwt", { session: false }),
  getFriends
);
router.get("/users", getPosts);

module.exports = router;
