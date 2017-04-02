export default (sequelize, DataTypes) => {
  const models = sequelize.models;

  const Text = sequelize.define('text', {
    title: { type: DataTypes.STRING },
    content: { type: DataTypes.TEXT, defaultValue: '' },
    order: { type: DataTypes.INTEGER }
  }, {
    classMethods: {
      associate: () => {
        Text.belongsToMany(models.word, { through: 'wordText' });
        Text.hasMany(models.wordText, { onDelete: 'cascade', hooks: true });
        Text.belongsToMany(models.char, { through: 'charText' });
        Text.hasMany(models.charText, { onDelete: 'cascade', hooks: true });
      }
    }
  });
  return Text;
}
