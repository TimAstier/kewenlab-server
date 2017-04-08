'use strict';

module.exports = {
  up: function(queryInterface) {
    return queryInterface.removeColumn('users', 'timezone');
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.addColumn('users', 'timezone', Sequelize.STRING);
  }
};
