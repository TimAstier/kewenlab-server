'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'charTexts',
      'manuallyDeleted',
      {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('charTexts', 'manuallyDeleted');
  }
};
