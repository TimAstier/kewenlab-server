import ProjectsGetter from '../services/projects-getter';
const ProjectSerializer = require('../serializers/project');

function list(request, response, next) {
  ProjectsGetter(request.params.userId)
    .then(projects => {
      return ProjectSerializer.serialize(
        projects.map((project) => project.toJSON()));
    })
    .then((projects) => response.send(projects))
    .catch(next);
}

module.exports = app => {
  app.get('/api/projects/:userId', list);
};
