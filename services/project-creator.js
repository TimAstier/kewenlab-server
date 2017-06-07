import models from '../models';

export default function ProjectCreator(title) {
  return models.project
    .create({ title })
    .then(project => {
      if (project) {
        return project;
      }
      throw { status: 500, message: 'Could not create project' };
    });
}
