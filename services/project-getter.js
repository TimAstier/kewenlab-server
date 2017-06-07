import models from '../models';

export default function ProjectGetter(id) {
  return models.project
    .findOne({
      where: { id },
      include: [{
        model: models.text
      }]
    })
    .then(project => {
      if (!project) {
        throw { status: 500, message: 'Could not get project with id: ' + id };
      }
      return project;
    });
}
