import models from '../models';
import isEmpty from 'lodash/isEmpty';

export default function ProjectsGetter(userId) {
  return models.project
    .findAll({
      where: { userId },
      include: [{
        model: models.user
      }, {
        model: models.text
      }],
      order: [['updatedAt', 'DESC']]
    })
    .then(projects => {
      if (isEmpty(projects)) {
        throw { status: 500, message: 'Could not get list of projects' };
      }
      return projects;
    });
}
