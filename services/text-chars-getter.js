import models from '../models';

export default function TextCharsGetter(textId, projectId) {
  // Start with finding the order of the text in this project
  return models.textProject.findOne({ where: [{ textId }, { projectId }] })
   .then(textProject => {
     const order = textProject.order;
     return models.text
       .findOne({ where: { id: textId } })
       .then(text => {
         return text.getChars({
           attributes: ['id', 'chinese'],
           // An example of Sequelize's Eager loading
           include: [{
             model: models.text,
             // Avoid taking texts on which the item was manuallyDeleted
             // This allow to correctly calculate origin status
             // This is an example of filter via join table
             // See infos on stackoverflow: http://bit.ly/2jYCzd9
             through: { where: { manuallyDeleted: false } },
             attributes: ['id', 'title'],
             required: false,
             // To calculate the status, require only texts with textProjects
             // from the same project and with order $lte current order.
             include: [{
               model: models.textProject,
               where: [{ projectId }, { order: { $lte: order } }],
               attributes: ['order'],
               required: true // Awesome !
               // It remove instance that do not satisfy the criteria
             }]
           }]
         });
       });
   });
}
