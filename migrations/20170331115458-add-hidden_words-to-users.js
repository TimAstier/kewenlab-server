/* eslint-disable func-names*/
'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'users',
      'hidden_words',
      {
        type: Sequelize.ARRAY((Sequelize.INTEGER)),
        defaultValue: []
      }
    );
  },

  down: function(queryInterface) {
    return queryInterface.removeColumn('users', 'hidden_words');
  }
};
