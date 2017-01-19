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
    }
  }, {
    timestamps: true,
    classMethods: {
      associate: () => {
        Char.belongsToMany(models.text, {through: 'charText'});
        Char.hasMany(models.charText);
      }
    }
  });
  return Char;
};
