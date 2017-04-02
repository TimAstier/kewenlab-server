/* eslint-disable func-names */
'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('chars', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      chinese: { type: Sequelize.STRING(1), allowNull: false, unique: true },
      createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
      updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') }
    });
  },

  down: function(queryInterface) {
    return queryInterface.dropTable('chars');
  }
};
