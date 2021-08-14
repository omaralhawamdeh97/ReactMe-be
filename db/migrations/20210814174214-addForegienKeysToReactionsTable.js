"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Reactions", "userId", Sequelize.INTEGER, {
      references: {
        model: {
          tableName: "Users",
          schema: "schema",
        },
        key: "id",
      },
    });
    await queryInterface.addColumn("Reactions", "postId", Sequelize.INTEGER, {
      references: {
        model: {
          tableName: "Posts",
          schema: "schema",
        },
        key: "id",
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Reactions", "userId");
    await queryInterface.removeColumn("Reactions", "postId");
  },
};
