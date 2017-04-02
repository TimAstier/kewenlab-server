export default (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    password_digest: { type: DataTypes.STRING },
    active: { type: DataTypes.BOOLEAN, defaultValue: false },
    hidden_words: { type: DataTypes.ARRAY(DataTypes.INTEGER), defaultValue: [] }
  }, {
    classMethods: {
      associate: () => {
      }
    }
  });
  return User;
};
