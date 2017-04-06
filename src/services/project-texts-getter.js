import models from '../models';

export default function ProjectTextsGetter(id) {
  return models.project
    .findOne({ where: { id } })
    .then(project => {
      return project.getTexts({
        attributes: ['id', 'title']
      });
    });
}
