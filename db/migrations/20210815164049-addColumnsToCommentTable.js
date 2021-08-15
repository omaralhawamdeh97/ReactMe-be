"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Comments", "userId", Sequelize.INTEGER, {
      references: {
        model: {
          tableName: "Users",
          schema: "schema",
        },
        key: "id",
      },
    });
    await queryInterface.addColumn(
      "Comments",
      "reactionId",
      Sequelize.INTEGER,
      {
        references: {
          model: {
            tableName: "Reactions",
            schema: "schema",
          },
          key: "id",
        },
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Comments", "userId");
    await queryInterface.removeColumn("Comments", "reactionId");
  },
};
