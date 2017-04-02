/* eslint-disable func-names */
'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.addColumn('chars', 'frequency', Sequelize.INTEGER);
  },

  down: function(queryInterface) {
    return queryInterface.removeColumn('chars', 'frequency');
  }
};
