const models = require('../models');

export default function CharsGetter(textId) {
  this.perform = () => {
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
  };
}
