const express = require("express");
const passport = require("passport");
const {
  signup,
  signin,
  getFriends,
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
  "/user/friends",
  passport.authenticate("jwt", { session: false }),
  getFriends
);

module.exports = router;
