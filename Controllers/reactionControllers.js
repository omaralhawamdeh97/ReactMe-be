const { Reaction } = require("../db/models");

exports.createReaction = async (req, res, next) => {
  console.log(req.body, "body");
  console.log(req.file, "file");
  if (req.file) {
    req.body.video = `http://${req.get("host")}/media/${req.file.filename}`;
  }
  req.body.userId = req.user.id;
  req.body.postId = +req.body.postId;
  try {
    const newReaction = await Reaction.create(req.body);
    res.status(201).json(newReaction);
  } catch (error) {
    next(error);
  }
};
