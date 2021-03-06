import authenticate from '../middlewares/authenticate.js';

import TextCharsGetter from '../services/text-chars-getter';
import TextWordsGetter from '../services/text-words-getter';
import TextCreator from '../services/text-creator';
import TextContentUpdater from '../services/text-content-updater';
import TextGetter from '../services/text-getter';
import TextCharsUpdater from '../services/textChars-updater';
import TextWordsUpdater from '../services/textWords-updater';
import TextSuggestionsGetter from '../services/text-suggestions-getter';
import TextBonusUpdater from '../services/text-bonus-updater';
import TextTitleUpdater from '../services/text-title-updater';

function get(request, response, next) {
  TextGetter(request.params.id)
    .then(text => response.json({ text }))
    .catch(next);
}

function getChars(request, response, next) {
  TextCharsGetter(request.params.id, request.params.projectId)
    .then(chars => response.status(200).json({ chars }))
    .catch(next);
}

function getWords(request, response, next) {
  TextWordsGetter(request.params.id, request.params.projectId)
    .then(words => response.status(200).json({ words }))
    .catch(next);
}

function update(request, response, next) {
  TextContentUpdater(request.params.id, request.body.content)
    .then(affected => response.status(200).json({ affected }))
    .catch(next);
}

function create(request, response, next) {
  TextCreator(request.body.projectId, request.body.userId)
    .then(() => response.status(201).json(request.body.projectId))
    .catch(next);
}

function updateChars(request, result, next) {
  TextCharsUpdater(request)
    .then(chars => result.status(200).json(chars))
    .catch(next);
}

function updateWords(request, result, next) {
  TextWordsUpdater(request)
    .then(words => result.status(200).json(words))
    .catch(next);
}

function getSuggestions(request, result, next) {
  const { id, userId, projectId } = request.params;
  TextSuggestionsGetter(id, userId, projectId)
    .then(suggestions => result.status(200).json(suggestions))
    .catch(next);
}

function updateBonus(request, response, next) {
  TextBonusUpdater(request)
  .then(affected => response.status(200).json({ affected }))
  .catch(next);
}

function updateTitle(request, response, next) {
  TextTitleUpdater(request)
  .then(affected => response.status(200).json({ affected }))
  .catch(next);
}

module.exports = app => {
  app.get('/api/texts/:id', authenticate, get);
  app.get('/api/texts/:id/chars/:projectId', authenticate, getChars);
  app.get('/api/texts/:id/words/:projectId', authenticate, getWords);
  app.put('/api/texts/:id', authenticate, update);
  app.post('/api/texts', authenticate, create);
  app.put('/api/texts/:id/chars', authenticate, updateChars);
  app.put('/api/texts/:id/words', authenticate, updateWords);
  app.get('/api/texts/:id/suggestions/:number/:userId/:projectId', authenticate, getSuggestions);
  app.put('/api/texts/:id/bonus', authenticate, updateBonus);
  app.put('/api/texts/:id/title', authenticate, updateTitle);
};
