module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      validate: { isEmail: true },
    },
  });

  // User.associate = (models) => {
  //   User.hasMany(models.Post, { forgienKey: "userId", as: "posts" });
  //   models.Post.belongsTo(User, { forgienKey: "userId", as: "posts" });
  // };

  return User;
};
