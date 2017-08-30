'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('textProjects', 'bonus', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    });
  },

  down: function (queryInterface) {
    return queryInterface.removeColumn('textProjects', 'bonus');
  }
};