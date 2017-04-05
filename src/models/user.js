export default (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    password_digest: { type: DataTypes.STRING },
    active: { type: DataTypes.BOOLEAN, defaultValue: false },
    hidden_words: { type: DataTypes.ARRAY(DataTypes.INTEGER), defaultValue: [] },
    favorite_words: { type: DataTypes.ARRAY(DataTypes.INTEGER), defaultValue: [] }
  }, {
    classMethods: {
      associate: () => {
        User.hasMany(models.Text);
      }
    },
    instanceMethods: {
      hideWord(wordId) {
        if (this.get('hidden_words').indexOf(Number(wordId)) === -1) {
          this.hidden_words.push(parseInt(wordId, 10));
          return this.update({
            hidden_words: this.hidden_words
          });
        }
        throw { status: 400, message: 'Word ' + wordId + ' already hidden' };
      },
      favoriteWord(wordId) {
        if (this.get('favorite_words').indexOf(Number(wordId)) === -1) {
          this.favorite_words.push(parseInt(wordId, 10));
          return this.update({
            favorite_words: this.favorite_words
          });
        }
        throw { status: 400, message: 'Word ' + wordId + ' already favorited' };
      },
      unfavoriteWord(wordId) {
        if (this.get('favorite_words').indexOf(Number(wordId)) !== -1) {
          const updatedList = this.favorite_words.filter(id => id !== Number(wordId));
          return this.update({
            favorite_words: updatedList
          });
        }
        throw { status: 400, message: 'Word ' + wordId + ' is not favorited' };
      }
    }
  });
  return User;
};
