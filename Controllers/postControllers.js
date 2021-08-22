const { Post, Reaction, User } = require("../db/models");

exports.createPost = async (req, res, next) => {
  console.log("entered,be");
  if (req.file) {
    req.body.video = `http://${req.get("host")}/media/${req.file.filename}`;
  }
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
    const posts = await Post.findAll({
      where: { userId: req.user.id },
      include: [
        {
          model: Reaction,
          as: "reactions",
          include: {
            model: User,
            as: "user",
            attributes: { exclude: "password" },
          },
        },
        { model: User, as: "user", attributes: { exclude: "password" } },
      ],
    });
    res.json(posts);
  } catch (error) {
    next(error);
  }
};

exports.getPublicPosts = async (req, res, next) => {
  const count = 10;
  console.log(req.params.page);
  try {
    let posts = await Post.findAll({
      limit: count,
      offset: req.params.page * count,
      include: [
        {
          model: Reaction,
          as: "reactions",
          include: {
            model: User,
            as: "user",
            attributes: { exclude: "password" },
          },
        },
        { model: User, as: "user", attributes: { exclude: "password" } },
      ],
    });
    posts = posts.filter((post) => post.user.isPublic === true);
    res.json(posts);
  } catch (error) {
    next(error);
  }
};
