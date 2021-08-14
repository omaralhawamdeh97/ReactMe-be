module.exports = (sequelize, DataTypes) => {
  const Reaction = sequelize.define("Reaction", {
    video: {
      type: DataTypes.STRING,
    },
    title: {
      type: DataTypes.STRING,
    },
  });

  Reaction.associate = (models) => {
    models.User.hasMany(Reaction, {
      foreignKey: "userId",
      as: "reactions",
    });
    Reaction.belongsTo(models.User, {
      foreignKey: "userId",
    });
    models.Post.hasMany(Reaction, {
      foreignKey: "postId",
      as: "reactions",
    });
    Reaction.belongsTo(models.Post, {
      foreignKey: "postId",
    });
  };

  return Reaction;
};
