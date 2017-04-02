export default (sequelize, DataTypes) => {
  const models = sequelize.models;
  const WordText = sequelize.define('wordText', {
    order: { type: DataTypes.INTEGER },
    wordId: { type: DataTypes.INTEGER },
    textId: { type: DataTypes.INTEGER },
    manuallyAdded: { type: DataTypes.BOOLEAN },
    manuallyDeleted: { type: DataTypes.BOOLEAN }
  }, {
    classMethods: {
      associate: () => {
        WordText.belongsTo(models.word);
        WordText.belongsTo(models.text);
      }
    }
  });
  return WordText;
};
