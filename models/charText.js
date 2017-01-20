export default (sequelize, DataTypes) => {
  let models = sequelize.models;
  let CharText = sequelize.define('charText', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    charId: {
      type: DataTypes.INTEGER
    },
    textId: {
      type: DataTypes.INTEGER
    },
    order: {
      type: DataTypes.INTEGER
    }
  }, {
    timestamps: true,
    classMethods: {
      associate: () => {
        CharText.belongsTo(models.char);
        CharText.belongsTo(models.text);
      }
    }
  });
  return CharText;
};
