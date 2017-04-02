/* eslint-disable func-names */
'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.addColumn('charTexts', 'manuallyAdded', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true
    });
  },

  down: function(queryInterface) {
    return queryInterface.removeColumn('charTexts', 'manuallyAdded');
  }
};
