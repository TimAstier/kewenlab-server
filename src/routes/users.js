import UserGetter from '../services/user-getter';
import UserCreator from '../services/user-creator';
import UsersGetter from '../services/users-getter';

function get(request, response, next) {
  new UsersGetter(request.params.identifier)
    .perform()
    .then(user => response.json({ user }))
    .catch(next);
}

function post(request, response, next) {
  new UserCreator(request.body)
    .perform()
    .then(user => response.json({ user }))
    .catch(next);
}

// TODO: continue refactoring
function hideword(request, response, next) {
  new UserGetter(request.params.id)
    .perform()
    .then((user) => {
      user
        .hideWord(request.params.wordId)
        .then((user) => {
          if (user) {
            return response.status(204).send(user);
          }
          return response.status(200).send('Word already hidden');
        });
    })
    .catch(next);
}

module.exports = function(app) {
  app.get('/api/users/:identifier', get);
  app.post('/api/users', post);
  app.put('/api/users/:id/hideword/:wordId', hideword);
};
