export default (sequelize, DataTypes) => {
  const models = sequelize.models;

  const Char = sequelize.define('char', {
    chinese: { type: DataTypes.STRING(1) },
    frequency: { type: DataTypes.INTEGER }
  }, {
    classMethods: {
      associate: () => {
        Char.belongsToMany(models.text, { through: 'charText' });
        Char.hasMany(models.charText, { onDelete: 'cascade', hooks: true });
        Char.belongsToMany(models.word, { through: 'charWord' });
        Char.hasMany(models.charWord, { onDelete: 'cascade', hooks: true });
      }
    }
  });

  return Char;
};
