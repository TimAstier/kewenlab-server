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
    },
    instanceMethods: {
      hideWord(wordId) {
        if (this.hidden_words.indexOf(wordId) === -1) {
          this.hidden_words.push(parseInt(wordId, 10));
          return this.update({
            hidden_words: this.hidden_words
          });
        }
        return false;
      }
    }
  });
  return User;
};
