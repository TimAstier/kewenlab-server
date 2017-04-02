/* eslint-disable func-names */
'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.changeColumn('chars', 'frequency', {
      type: Sequelize.INTEGER,
      unique: true
    });
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.changeColumn('chars', 'frequency', {
      type: Sequelize.INTEGER
    });
  }
};
