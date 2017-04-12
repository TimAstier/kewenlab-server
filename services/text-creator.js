import models from '../models';

export default function TextCreator(projectId, userId) {
  // find max order of texts in this project
  return models.textProject
    .max('order', { where: { projectId } })
    .then(maxOrder => {
      let order = maxOrder;
      if (isNaN(order)) {
        order = 0;
      }
      return models.text
        .create({ title: 'New text', userId })
        .then(text => {
          if (text) {
            return models.textProject
              .create({
                textId: text.id,
                projectId,
                order: order + 1,
                originProject: projectId
              })
              .then(textProject => {
                if (textProject) {
                  return text;
                }
                throw { status: 500, message: 'Could not create textProject' };
              });
          }
          throw { status: 500, message: 'Could not create text' };
        });
    });
}
