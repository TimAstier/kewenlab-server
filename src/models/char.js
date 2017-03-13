export default (sequelize, DataTypes) => {
  let models = sequelize.models;

  let Char = sequelize.define('char', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    chinese: {
      type: DataTypes.STRING(1),
      allowNull: false,
      unique: true
    },
    frequency: {
      type: DataTypes.INTEGER,
      unique: true
    }
  }, {
    timestamps: true,
    classMethods: {
      associate: () => {
        Char.belongsToMany(models.text, { through: 'charText' });
        Char.hasMany(models.charText, { onDelete: 'cascade', hooks: true });
        Char.belongsToMany(models.word, { through: 'charWord' });
        Char.hasMany(models.charWord, { onDelete: 'cascade', hooks: true });
      }
    }
  });

  return Char;
};
