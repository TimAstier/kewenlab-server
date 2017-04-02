export default (sequelize, DataTypes) => {
  const models = sequelize.models;
  const CharText = sequelize.define('charText', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    charId: { type: DataTypes.INTEGER },
    textId: { type: DataTypes.INTEGER },
    order: { type: DataTypes.INTEGER },
    manuallyAdded: { type: DataTypes.BOOLEAN },
    manuallyDeleted: { type: DataTypes.BOOLEAN }
  }, {
    classMethods: {
      associate: () => {
        CharText.belongsTo(models.char);
        CharText.belongsTo(models.text);
      }
    }
  });
  return CharText;
};
