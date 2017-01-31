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
      type: DataTypes.TEXT,
      default: ''
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
        Text.belongsToMany(models.word, { through: 'wordText' });
        Text.hasMany(models.wordText, { onDelete: 'cascade', hooks: true });
        Text.belongsToMany(models.char, { through: 'charText' });
        Text.hasMany(models.charText, { onDelete: 'cascade', hooks: true });
      }
    }
  });
  return Text;
}
