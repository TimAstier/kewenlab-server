export default (sequelize, DataTypes) => {
  let models = sequelize.models;

  let Text = sequelize.define('text', {
    id: {
      type: DataTypes.STRING,
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
      }
    }
  });
  return Text;
}
