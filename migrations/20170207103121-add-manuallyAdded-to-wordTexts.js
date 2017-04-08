'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.addColumn('wordTexts', 'manuallyAdded', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true
    });
  },

  down: function(queryInterface) {
    return queryInterface.removeColumn('wordTexts', 'manuallyAdded');
  }
};
