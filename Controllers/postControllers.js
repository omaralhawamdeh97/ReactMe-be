const { Post } = require("../db/models");

exports.createPost = async (req, res, next) => {
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
