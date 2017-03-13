export default (sequelize, DataTypes) => {
  let models = sequelize.models;
  let CharWord = sequelize.define('charWord', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    charId: {
      type: DataTypes.INTEGER
    },
    wordId: {
      type: DataTypes.INTEGER
    }
  }, {
    timestamps: true,
    classMethods: {
      associate: () => {
        CharWord.belongsTo(models.char);
        CharWord.belongsTo(models.word);
      }
    }
  });
  return CharWord;
};
