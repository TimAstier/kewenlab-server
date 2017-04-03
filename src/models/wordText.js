export default (sequelize, DataTypes) => {
  const models = sequelize.models;
  const WordText = sequelize.define('wordText', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    wordId: { type: DataTypes.INTEGER },
    textId: { type: DataTypes.INTEGER },
    order: { type: DataTypes.INTEGER },
    // The following constraints are important
    // Removing them creates a bug when saving items with an important DB
    manuallyAdded: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    manuallyDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
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
