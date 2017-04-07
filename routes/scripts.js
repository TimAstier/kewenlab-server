import models from '../models';

import WordLinker from '../services/word-linker';

function linkAllWords(request, response, next) {
  models.word
    .findAll()
    .then(words => words.forEach(w => WordLinker(w)))
    .then(() => response.status(200).send('done'))
    .catch(next);
}

function linkWord(request, response, next) {
  const id = request.params.id;
  models.word
    .findOne({ where: { id: id } })
    .then(w => WordLinker(w))
    .then(() => response.status(200).send('done'))
    .catch(next);
}

module.exports = app => {
  app.get('/api/scripts/linkwords', linkAllWords);
  app.get('/api/scripts/linkwords/:id', linkWord);
};
