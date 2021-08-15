module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define("Comment", {
    body: {
      type: DataTypes.STRING,
    },
  });
  Comment.associate = (models) => {
    models.Reaction.hasMany(Comment, {
      foreignKey: "reactionId",
      as: "comments",
    });
    Comment.belongsTo(models.Reaction, {
      foreignKey: "reactionId",
    });
    models.User.hasMany(Comment, {
      foreignKey: "userId",
      as: "comments",
    });
    Comment.belongsTo(models.User, {
      foreignKey: "userId",
    });
  };

  return Comment;
};
