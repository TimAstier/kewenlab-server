import models from '../models';

export default function ProjectsGetter(userId) {
  return models.project
    .findAll({
      where: { userId: userId },
      include: [{
        model: models.user
      }, {
        model: models.text
      }]
    });
}
