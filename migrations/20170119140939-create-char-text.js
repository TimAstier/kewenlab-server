'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('charTexts', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      charId: { type: Sequelize.INTEGER },
      textId: { type: Sequelize.INTEGER },
      order: { type: Sequelize.INTEGER },
      createdAt: { type: Sequelize.DATE },
      updatedAt: { type: Sequelize.DATE }
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('charTexts');
  }
};
