'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'words',
      'frequency',
      Sequelize.INTEGER
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('words', 'frequency');
  }
};
