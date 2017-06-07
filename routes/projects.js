import authenticate from '../middlewares/authenticate.js';
import ProjectsGetter from '../services/projects-getter';
import ProjectTextsGetter from '../services/project-texts-getter';
import ProjectTextsUpdater from '../services/project-texts-updater';
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

function getTexts(request, response, next) {
  ProjectTextsGetter(request.params.id)
    .then(texts => response.json({ texts }))
    .catch(next);
}

function updateTexts(request, response, next) {
  ProjectTextsUpdater(request.body, request.params.id)
    .then(() => response.send('success'))
    .catch(next);
}

module.exports = app => {
  app.get('/api/projects/:userId', list);
  app.get('/api/projects/:id/texts', authenticate, getTexts);
  app.put('/api/projects/:id/texts', authenticate, updateTexts);
};
