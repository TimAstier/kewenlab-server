export default (sequelize, DataTypes) => {
  const models = sequelize.models;

  const Text = sequelize.define('text', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING },
    content: { type: DataTypes.TEXT, defaultValue: '' }
  }, {
    classMethods: {
      associate: () => {
        Text.belongsToMany(models.word, { through: 'wordText' });
        Text.hasMany(models.wordText, { onDelete: 'cascade', hooks: true });
        Text.belongsToMany(models.char, { through: 'charText' });
        Text.hasMany(models.charText, { onDelete: 'cascade', hooks: true });
        Text.belongsTo(models.user);
        Text.belongsToMany(models.project, { through: 'textProject' });
        Text.hasMany(models.textProject, { onDelete: 'cascade', hooks: true });
      }
    }
  });
  return Text;
};
