"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      "FriendShips",
      "firstUserId",
      Sequelize.INTEGER,
      {
        references: {
          model: {
            tableName: "Users",
            schema: "schema",
          },
          key: "id",
        },
      }
    );
    await queryInterface.addColumn(
      "FriendShips",
      "secondUserId",
      Sequelize.INTEGER,
      {
        references: {
          model: {
            tableName: "Users",
            schema: "schema",
          },
          key: "id",
        },
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("FriendShips", "firstUserId");
    await queryInterface.removeColumn("FriendShips", "secondUserId");
  },
};
