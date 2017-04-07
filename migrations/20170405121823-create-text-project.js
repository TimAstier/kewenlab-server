/* eslint-disable func-names */
'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('textProjects', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      textId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'texts',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      projectId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'projects',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      originProject: { type: Sequelize.INTEGER },
      order: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 1 },
      createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
      updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') }
    });
  },

  down: function(queryInterface) {
    return queryInterface.dropTable('textProjects');
  }
};
