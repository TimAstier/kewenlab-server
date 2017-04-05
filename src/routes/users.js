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

function hideWord(request, response, next) {
  UserGetter(request.params.id)
    .then(user => {
      return user.hideWord(request.params.wordId)
        .then((user) => response.status(204).send(user));
    })
    .catch(next);
}

function favoriteWord(request, response, next) {
  UserGetter(request.params.id)
    .then(user => {
      return user.favoriteWord(request.params.wordId)
        .then((user) => response.status(204).send(user));
    })
    .catch(next);
}

function unfavoriteWord(request, response, next) {
  UserGetter(request.params.id)
    .then(user => {
      return user.unfavoriteWord(request.params.wordId)
        .then((user) => response.status(204).send(user));
    })
    .catch(next);
}

module.exports = app => {
  app.get('/api/users/:identifier', get);
  app.post('/api/users', post);
  app.put('/api/users/:id/hideword/:wordId', hideWord);
  app.put('/api/users/:id/favoriteword/:wordId', favoriteWord);
  app.put('/api/users/:id/unfavoriteword/:wordId', unfavoriteWord);
};
