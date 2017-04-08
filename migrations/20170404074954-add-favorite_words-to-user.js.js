'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.addColumn('users', 'favorite_words', {
      type: Sequelize.ARRAY(Sequelize.INTEGER),
      defaultValue: []
    });
  },

  down: function(queryInterface) {
    return queryInterface.removeColumn('users', 'favorite_words');
  }
};
