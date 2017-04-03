import authenticate from '../middlewares/authenticate.js';

import TextCharsGetter from '../services/text-chars-getter';
import TextWordsGetter from '../services/text-words-getter';
import TextCreator from '../services/text-creator';
import TextContentUpdater from '../services/text-content-updater';
import TextGetter from '../services/text-getter';
import TextsGetter from '../services/texts-getter';
import TextCharsUpdater from '../services/text-chars-updater';
import TextWordsUpdater from '../services/text-words-updater';
import TextSuggestionsGetter from '../services/text-suggestions-getter';

function get(request, response, next) {
  TextGetter(request.params.id)
    .then(text => response.json({ text }))
    .catch(next);
}

function getAll(request, response, next) {
  TextsGetter()
    .then(texts => response.json({ texts }))
    .catch(next);
}

function getChars(request, response, next) {
  TextCharsGetter(request.params.id)
    .then(chars => response.status(200).json({ chars }))
    .catch(next);
}

function getWords(request, response, next) {
  TextWordsGetter(request.params.id)
    .then(words => response.status(200).json({ words }))
    .catch(next);
}

function update(request, response, next) {
  TextContentUpdater(request.params.id, request.body.content)
    .then(() => response.status(200).json({ success: true }))
    .catch(next);
}

function create(request, response, next) {
  TextCreator()
    .then(text => response.status(201).json({ text }))
    .catch(next);
}

function updateChars(request, result, next) {
  TextCharsUpdater(request)
    .then(chars => result.status(200).json(chars))
    .catch(next);
}

function updateWords(request, result, next) {
  TextWordsUpdater(request)
    // BUG words is not taken after those updates
    .then(words => result.status(200).json(words))
    .catch(next);
}

function getSuggestions(request, result, next) {
  TextSuggestionsGetter(request.params.id, request.params.userId)
    .then(suggestions => result.status(200).json(suggestions))
    .catch(next);
}

module.exports = app => {
  app.get('/api/texts/:id', authenticate, get);
  app.get('/api/texts', authenticate, getAll);
  app.get('/api/texts/:id/chars', authenticate, getChars);
  app.get('/api/texts/:id/words', authenticate, getWords);
  app.put('/api/texts/:id', authenticate, update);
  app.post('/api/texts', authenticate, create);
  app.put('/api/texts/:id/chars', authenticate, updateChars);
  app.put('/api/texts/:id/words', authenticate, updateWords);
  app.get('/api/texts/:id/suggestions/:number/:userId', authenticate, getSuggestions);
};
