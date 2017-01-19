export default (sequelize, DataTypes) => {
  let models = sequelize.models;

  let Word = sequelize.define('word', {
    id: {
      type: DataTypes.STRING,
      autoIncrement: true,
      primaryKey: true
    },
    chinese: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: true,
    classMethods: {
      associate: () => {
        Word.belongsToMany(models.text, {through: 'wordText'});
        Word.hasMany(models.wordText);
      }
    }
  });
  return Word;
};
