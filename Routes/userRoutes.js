const express = require("express");
const passport = require("passport");
const { signup, signin } = require("../Controllers/userControllers");
const upload = require("../Middlewares/multer");

const router = express.Router();

router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);
router.post("/signup", signup);

module.exports = router;
