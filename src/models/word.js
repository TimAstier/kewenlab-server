export default (sequelize, DataTypes) => {
  const models = sequelize.models;

  const Word = sequelize.define('word', {
    chinese: { type: DataTypes.STRING },
    frequency: { type: DataTypes.INTEGER },
    banned: { type: DataTypes.BOOLEAN, defaultValue: false }
  }, {
    classMethods: {
      associate: () => {
        Word.belongsToMany(models.text, { through: 'wordText' });
        Word.hasMany(models.wordText, { onDelete: 'cascade', hooks: true });
        Word.belongsToMany(models.char, { through: 'charWord' });
        Word.hasMany(models.charWord, { onDelete: 'cascade', hooks: true });
      }
    }
  });
  return Word;
};
