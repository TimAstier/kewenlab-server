'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'wordTexts',
      'manuallyDeleted',
      {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('wordTexts', 'manuallyDeleted');
  }
};
