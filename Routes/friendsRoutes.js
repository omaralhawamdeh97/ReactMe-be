//Setup
const express = require("express");
const passport = require("passport");
const router = express.Router();

//Controllers
const {
  friendsCreate,
  friendsList,
} = require("../Controllers/friendsController");

router.post(
  "/friends",
  passport.authenticate("jwt", { session: false }),
  friendsCreate
);

router.get("/friends", friendsList);
module.exports = router;
