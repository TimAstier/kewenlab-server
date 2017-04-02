export default (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
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
