//Model
const { Friends, User } = require("../db/models");

exports.friendsCreate = async (req, res, next) => {
  try {
    const foundFriend = await User.findOne({
      where: { id: req.body.secondUserId },
    });
    if (foundFriend) {
      req.body.secondUserId = foundFriend.id;
      const newFriendShip = await Friends.create(req.body);
      res.status(201).json(newFriendShip);
    } else {
      res.json({ message: "Username does not exist" });
    }
  } catch (error) {
    next(error);
  }
};

exports.friendsList = async (req, res, next) => {
  try {
    const friends = await Friends.findAll({
      attributes: { exclude: ["createdAt"] },
    });
    res.json(friends);
  } catch (error) {
    next(error);
  }
};
