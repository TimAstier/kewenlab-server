import WordsBanner from '../services/words-banner';

function ban(request, response, next) {
  new WordsBanner(request.params.wordId)
    .perform()
    .then(() => {
      response.status(204).send('success');
    })
    .catch(next);
}

module.exports = function(app) {
  app.put('/api/words/:wordId/ban', ban);
};
