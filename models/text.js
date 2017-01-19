export default (sequelize, DataTypes) => {
  let models = sequelize.models;

  let Text = sequelize.define('text', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT
    },
    order: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    timestamps: true,
    classMethods: {
      associate: () => {
        Text.belongsToMany(models.word, {through: 'wordText'});
        Text.hasMany(models.wordText);
        Text.belongsToMany(models.char, {through: 'charText'});
        Text.hasMany(models.charText);
      }
    }
  });
  return Text;
}
