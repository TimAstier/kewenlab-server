export default (sequelize, DataTypes) => {
  const models = sequelize.models;
  const WordText = sequelize.define('wordText', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    wordId: { type: DataTypes.INTEGER },
    textId: { type: DataTypes.INTEGER },
    order: { type: DataTypes.INTEGER },
    manuallyAdded: { type: DataTypes.BOOLEAN, defaultValue: true },
    manuallyDeleted: { type: DataTypes.BOOLEAN, defaultValue: false }
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
