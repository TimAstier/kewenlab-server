import UserGetter from '../services/user-getter';
const ProjectSerializer = require('../serializers/project');

function list(request, response, next) {
  UserGetter(request.params.userId)
    .then(user => user.getProjects())
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
