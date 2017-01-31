export default (sequelize, DataTypes) => {
  let models = sequelize.models;

  let Word = sequelize.define('word', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    chinese: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    timestamps: true,
    classMethods: {
      associate: () => {
        Word.belongsToMany(models.text, { through: 'wordText' });
        Word.hasMany(models.wordText, { onDelete: 'cascade', hooks: true });
      }
    }
  });
  return Word;
};
