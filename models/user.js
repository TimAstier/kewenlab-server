export default (sequelize, DataTypes) => {
  let models = sequelize.models;
  let User = sequelize.define('user', {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      autoIncrement: true,
      primaryKey: true
    },
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    timezone: { type: DataTypes.STRING, allowNull: false },
    password_digest: { type: DataTypes.STRING, allowNull: false }
  }, {
    timestamps: true,
    classMethods: {
      associate: () => {
      }
    }
  });
  return User;
}