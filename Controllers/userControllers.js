const bcrypt = require("bcrypt");
const { User, Post, Reaction } = require("../db/models");
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
  try {
    const foundUser = await User.findOne({
      where: { id: req.user.id },
      attributes: { exclude: ["password"] },
      include: [
        {
          model: User,
          as: "from",
          attributes: { exclude: ["password"] },
          include: {
            model: Post,
            as: "posts",
            include: [
              {
                model: User,
                as: "user",
                attributes: { exclude: ["password"] },
              },
              {
                model: Reaction,
                as: "reactions",
                include: {
                  model: User,
                  as: "user",
                  attributes: { exclude: ["password"] },
                },
              },
            ],
          },
        },
        {
          model: User,
          as: "to",
          attributes: { exclude: ["password"] },
          include: {
            model: Post,
            as: "posts",
            include: [
              {
                model: User,
                as: "user",
                attributes: { exclude: ["password"] },
              },
              {
                model: Reaction,
                as: "reactions",
                include: {
                  model: User,
                  as: "user",
                  attributes: { exclude: ["password"] },
                },
              },
            ],
          },
        },
      ],
    });
    const friends = [
      ...foundUser.from.map((friend) => friend),
      ...foundUser.to.map((friend) => friend),
    ];
    res.json(friends);
  } catch (error) {
    next(error);
  }
};
