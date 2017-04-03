import models from '../models';

// TODO: Move this into Text instance methods

export default {
  getChars: (textId) => {
    return models.text
      .findOne({ where: { id: textId } })
      .then(text => {
        return text.getChars({
          attributes: ['id', 'chinese'],
          // An example of Sequelize's Eager loading
          include: [{
            model: models.text,
            // We don't take texts on which the item was manuallyDeleted
            // This allow to correctly calculate origin status
            // This is an example of filter via join table
            // See infos on stackoverflow: http://bit.ly/2jYCzd9
            through: { where: { manuallyDeleted: false } },
            where: { order: { $lt: text.order } },
            attributes: ['title', 'order'],
            order: [
              ['order', 'DESC']
            ],
            required: false
          }]
        });
      });
  },
  getWords: (textId) => {
    return models.text
      .findOne({ where: { id: textId } })
      .then(text => {
        return text.getWords({
          attributes: ['id', 'chinese'],
          // An example of Sequelize's Eager loading
          include: [{
            model: models.text,
            // We don't take texts on which the item was manuallyDeleted
            // This allow to correctly calculate origin status
            through: { where: { manuallyDeleted: false } },
            where: { order: { $lt: text.order } },
            attributes: ['title', 'order'],
            order: [
              ['order', 'DESC']
            ],
            required: false
          }]
        });
      });
  }
};
