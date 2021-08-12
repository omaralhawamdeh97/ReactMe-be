module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define("Post", {
    video: {
      type: DataTypes.STRING,
    },
    title: {
      type: DataTypes.STRING,
    },
  });

  return Post;
};
