'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('users', 'timezone');
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('users', 'timezone', {
      type: Sequelize.STRING,
      allowNull: false
    });
  }
};
