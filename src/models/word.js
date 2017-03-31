export default (sequelize, DataTypes) => {
  const models = sequelize.models;

  const Word = sequelize.define('word', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    chinese: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    frequency: {
      type: DataTypes.INTEGER,
      unique: true
    },
    banned: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: false
    }
  }, {
    timestamps: true,
    classMethods: {
      associate: () => {
        Word.belongsToMany(models.text, { through: 'wordText' });
        Word.hasMany(models.wordText, { onDelete: 'cascade', hooks: true });
        Word.belongsToMany(models.char, { through: 'charWord' });
        Word.hasMany(models.charWord, { onDelete: 'cascade', hooks: true });
      }
    }
  });
  return Word;
};
