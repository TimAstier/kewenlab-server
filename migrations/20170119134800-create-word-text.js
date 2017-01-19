'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('wordTexts', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      wordId: { type: Sequelize.INTEGER },
      textId: { type: Sequelize.INTEGER },
      order: { type: Sequelize.INTEGER },
      createdAt: { type: Sequelize.DATE },
      updatedAt: { type: Sequelize.DATE }
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('wordTexts');
  }
};
