import UserGetter from '../services/user-getter';
import UserCreator from '../services/user-creator';
import UsersGetter from '../services/users-getter';
import UserSerializer from '../serializers/users';

function get(request, response, next) {
  UsersGetter(request.params.identifier)
    .then(users => UserSerializer(users[0]))
    .then(user => response.json({ user }))
    .catch(next);
}

function post(request, response, next) {
  UserCreator(request.body)
    .then(user => response.json({ user }))
    .catch(next);
}

// TODO: continue refactoring
function hideword(request, response, next) {
  UserGetter(request.params.id)
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

module.exports = app => {
  app.get('/api/users/:identifier', get);
  app.post('/api/users', post);
  app.put('/api/users/:id/hideword/:wordId', hideword);
};
