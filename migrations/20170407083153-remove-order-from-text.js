/* eslint-disable func-names */
'use strict';

module.exports = {
  up: function(queryInterface) {
    return queryInterface.removeColumn('texts', 'order');
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.addColumn('texts', 'order', {
      type: Sequelize.INTEGER, allowNull: false, defaultValue: 0,
    });
  }
};
