export default (sequelize, DataTypes) => {
  const models = sequelize.models;
  const CharWord = sequelize.define('charWord', {
    charId: { type: DataTypes.INTEGER },
    wordId: { type: DataTypes.INTEGER }
  }, {
    classMethods: {
      associate: () => {
        CharWord.belongsTo(models.char);
        CharWord.belongsTo(models.word);
      }
    }
  });
  return CharWord;
};
