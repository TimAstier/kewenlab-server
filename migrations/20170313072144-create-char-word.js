/* eslint-disable func-names */
'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('charWords', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      charId: { type: Sequelize.INTEGER },
      wordId: { type: Sequelize.INTEGER },
      createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
      updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') }
    });
  },

  down: function(queryInterface) {
    return queryInterface.dropTable('charWords');
  }
};
