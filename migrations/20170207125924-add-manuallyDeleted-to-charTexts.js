/* eslint-disable func-names */
'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.addColumn('charTexts', 'manuallyDeleted', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    });
  },

  down: function(queryInterface) {
    return queryInterface.removeColumn('charTexts', 'manuallyDeleted');
  }
};
