export default (sequelize, DataTypes) => {
  const models = sequelize.models;
  const CharWord = sequelize.define('charWord', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
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
