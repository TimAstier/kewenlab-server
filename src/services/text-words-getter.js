import models from '../models';

export default function TextWordsGetter(textId, projectId) {
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
          attributes: ['title', 'order'],
          order: [
            ['order', 'DESC']
          ],
          required: false,
          // Retrieve only textProjects belongings to the text-project pair
          // We use this to calculate the status
          include: [{
            model: models.textProject,
            where: { projectId: projectId },
            attributes: ['order'],
            required: false // Awesome !
            // If true, remove instance that do not satisfy the criteria
          }]
        }]
      });
    });
}
