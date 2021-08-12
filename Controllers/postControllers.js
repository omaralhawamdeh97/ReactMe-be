const { Post } = require("../db/models");

exports.createPost = async (req, res, next) => {
  if (req.file) {
    req.body.video = `http://${req.get("host")}/media/${req.file.filename}`;
  }
  console.log(req.body);
  req.body.userId = req.user.id;
  try {
    const newPost = await Post.create(req.body);
    res.status(201).json(newPost);
  } catch (error) {
    next(error);
  }
};

exports.getPosts = async (req, res, next) => {
  try {
    const posts = await Post.findAll({ where: { userId: req.user.id } });
    res.json(posts);
  } catch (error) {
    next(error);
  }
};
