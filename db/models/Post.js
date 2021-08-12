module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define("Post", {
    video: {
      type: DataTypes.STRING,
    },
    title: {
      type: DataTypes.STRING,
    },
  });

  Post.associate = (models) => {
    models.User.hasMany(Post, {
      foreignKey: "userId",
      as: "posts",
    });
    Post.belongsTo(models.User, {
      foreignKey: "userId",
      as: "posts",
    });
  };

  return Post;
};
