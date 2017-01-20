export default (sequelize, DataTypes) => {
  let models = sequelize.models;
  let WordText = sequelize.define('wordText', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    order: {
      type: DataTypes.INTEGER
    },
    wordId: {
      type: DataTypes.INTEGER
    },
    textId: {
      type: DataTypes.INTEGER
    },
  }, {
    timestamps: true,
    classMethods: {
      associate: () => {
        WordText.belongsTo(models.word);
        WordText.belongsTo(models.text);
      }
    }
  });
  return WordText;
};
