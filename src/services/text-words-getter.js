import models from '../models';

export default function TextWordsGetter(textId) {
  return models.text
    .findOne({ where: { id: textId } })
    .then(text => {
      return text.getWords({
        attributes: ['id', 'chinese'],
        // An example of Sequelize's Eager loading
        include: [{
          model: models.text,
          // Avoid taking texts on which the item was manuallyDeleted
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
