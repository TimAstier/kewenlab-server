export default (sequelize, DataTypes) => {
  const models = sequelize.models;

  const TextProject = sequelize.define('textProject', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    originProject: { type: DataTypes.INTEGER },
    order: { type: DataTypes.INTEGER, defaultValue: 1 },
    bonus: { type: DataTypes.BOOLEAN, defaultValue: false }
  }, {
    classMethods: {
      associate: () => {
        TextProject.belongsTo(models.text);
        TextProject.belongsTo(models.project);
      }
    }
  });
  return TextProject;
};
