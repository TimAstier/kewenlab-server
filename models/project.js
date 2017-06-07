export default (sequelize, DataTypes) => {
  const models = sequelize.models;

  const Project = sequelize.define('project', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING }
  }, {
    classMethods: {
      associate: () => {
        Project.belongsTo(models.user);
        Project.belongsToMany(models.text, { through: 'textProject', onDelete: 'cascade', hooks: true });
        Project.hasMany(models.textProject, { onDelete: 'cascade', hooks: true });
      }
    }
  });
  return Project;
};
