const bcrypt = require("bcrypt");
const { User, FriendShip } = require("../db/models");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRATION_MS } = require("../config/keys");

exports.signup = async (req, res, next) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    req.body.password = hashedPassword;
    const newUser = await User.create(req.body);
    const token = generateToken(newUser);
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

exports.signin = (req, res, next) => {
  const token = generateToken(req.user);
  res.json({ token });
};

const generateToken = (user) => {
  const payload = {
    id: user.id,
    username: user.username,
    exp: Date.now() + JWT_EXPIRATION_MS,
    image: user.image,
    email: user.email,
  };
  const token = jwt.sign(payload, JWT_SECRET);
  return token;
};

exports.getFriends = async (req, res, next) => {
  const foundUser = await User.findOne({
    where: { id: req.user.id },
    include: [
      { model: Friends, as: "from" },
      { model: Friends, as: "to" },
    ],
  });
  console.log(foundUser.from);
};
exports.getPosts = async (req, res, next) => {
  try {
    const posts = await User.findAll({
      include: [
        { model: FriendShip, as: "from" },
        { model: FriendShip, as: "to" },
      ],
    });
    res.json(posts);
  } catch (error) {
    next(error);
  }
};
