'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'chars',
      'frequency',
      Sequelize.INTEGER
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('chars', 'frequency');
  }
};
