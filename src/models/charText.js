export default (sequelize, DataTypes) => {
  const models = sequelize.models;
  const CharText = sequelize.define('charText', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    charId: { type: DataTypes.INTEGER },
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
        CharText.belongsTo(models.char);
        CharText.belongsTo(models.text);
      }
    }
  });
  return CharText;
};
