'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('chars', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      chinese: {
        type: Sequelize.STRING(1),
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('chars');
  }
};
