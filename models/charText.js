export default (sequelize, DataTypes) => {
  let models = sequelize.models;
  let CharText = sequelize.define('charText', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
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
