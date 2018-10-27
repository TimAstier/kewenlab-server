import models from '../models';
const liana = require('forest-express-sequelize');
import ProjectCreator from '../services/project-creator';
import ProjectGetter from '../services/project-getter';

function convertTextId(textIds, newTextIds, val) {
  const index = textIds.indexOf(val);
  return newTextIds[index];
}

function cloneProject(request, response, next) {
  const projectId = request.body.data.attributes.ids[0];

  // Initialize toClone
  function initializeToClone() {
    return {
      title: '',
      texts: [],
      charTexts: [],
      wordTexts: [],
      textProjects: []
    };
  }

  const toClone = initializeToClone();
  const textIds = [];

  // Get all elements to Clone
  return ProjectGetter(projectId)
    .then(project => {
      toClone.title = project.title + '_copy';
      return project.getTexts({
        attributes: ['id', 'title', 'content'],
        include: [{
          model: models.charText
        }, {
          model: models.wordText
        }, {
          model: models.textProject
        }]
      });
    })
    .then(texts => {
      texts.forEach(text => {
        toClone.texts.push({ title: text.title, content: text.content });
        text.charTexts.forEach(charText => toClone.charTexts.push(charText));
        text.wordTexts.forEach(wordText => toClone.wordTexts.push(wordText));
        toClone.textProjects.push(text.textProject);
        textIds.push(text.id);
      });
      // Create project
      return ProjectCreator(toClone.title)
        .then((project) => {
          console.log('project created')
          // Create texts
          const textsToCreate = toClone.texts.map(t => {
            return {
              title: t.title,
              content: t.content
            };
          });
          return models.text
          .bulkCreate(textsToCreate, { returning: true })
          .then(createdTexts => {
            console.log('texts created')
            // Retrieve ids of newley created texts
            const newTextIds = createdTexts.map(t => t.id);
            // Create charTexts
            const charTextsToCreate = toClone.charTexts.map(c => {
              return {
                charId: c.charId,
                textId: convertTextId(textIds, newTextIds, c.textId),
                order: c.order,
                manuallyAdded: c.manuallyAdded,
                manuallyDeleted: c.manuallyDeleted
              };
            });
            return models.charText.bulkCreate(charTextsToCreate)
              .then(() => {
                console.log('charTexts created')
                // Create wordTexts
                const wordTextsToCreate = toClone.wordTexts.map(w => {
                  return {
                    wordId: w.wordId,
                    textId: convertTextId(textIds, newTextIds, w.textId),
                    order: w.order,
                    manuallyAdded: w.manuallyAdded,
                    manuallyDeleted: w.manuallyDeleted
                  };
                });
                return models.wordText.bulkCreate(wordTextsToCreate)
                  .then(() => {
                    console.log('wordtexts created')
                    const textProjectsToCreate = toClone.textProjects.map(t => {
                      return {
                        projectId: project.id,
                        textId: convertTextId(textIds, newTextIds, t.textId),
                        bonus: t.bonus,
                        order: t.order,
                        originProject: t.originProject
                      };
                    });
                    return models.textProject.bulkCreate(textProjectsToCreate)
                      .then(() => {
                        console.log('textProjects created')
                        console.log('Project cloned! ids: ' + projectId + ' => ' + project.id); // eslint-disable-line no-console
                        response.send({ success: 'Project successfuly cloned.' });
                      });
                  });
              });
          });
        });
    })
    .catch(next);
}

module.exports = app => {
  app.post('/forest/actions/clone-project', liana.ensureAuthenticated, cloneProject);
};
