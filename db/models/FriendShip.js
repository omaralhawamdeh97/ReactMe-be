module.exports = (sequelize) => {
  const FriendShip = sequelize.define("FriendShip");

  FriendShip.associate = (models) => {
    models.User.belongsToMany(models.User, {
      through: FriendShip,
      foreignKey: "firstUserId",
      as: "from",
    });
    models.User.belongsToMany(models.User, {
      through: FriendShip,
      foreignKey: "secondUserId",
      as: "to",
    });
  };
  return FriendShip;
};
