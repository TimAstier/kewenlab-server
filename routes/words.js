import WordsBanner from '../services/words-banner';

function ban(request, response, next) {
  WordsBanner(request.params.wordId)
    .then(() => response.status(204).send('success'))
    .catch(next);
}

module.exports = app => {
  app.put('/api/words/:wordId/ban', ban);
};
