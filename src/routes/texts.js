import authenticate from '../middlewares/authenticate.js';
import isEmpty from 'lodash/isEmpty';

import models from '../models';

import TextService from '../services/TextService';
import CharTextService from '../services/CharTextService';
import WordTextService from '../services/WordTextService';
import CharsGetter from '../services/chars-getter';

function getAll(req, res) {
  models.text
    .findAll({
      attributes: ['id', 'order', 'title'],
      order: [
        ['order', 'ASC']
      ]
    })
    .then(texts => {
      res.json({ texts });
    });
}

function get(req, res) {
  models.text
    .findOne({
      where: { id: req.params.id },
      attributes: ['id', 'title', 'content', 'order']
    })
    .then(text => {
      res.json({ text });
    });
}

function getChars(req, res) {
  return TextService.getChars(req.params.id).then(chars => {
    return res.status(200).json({ chars });
  });
}

function getWords(req, res) {
  return TextService.getWords(req.params.id).then(words => {
    return res.status(200).json({ words });
  });
}

function update(req, res) {
  const { content } = req.body;
  models.text
    .update(
      { content },
      { where: { id: req.params.id } }
    )
    .then(() => {
      res.status(200).json({ success: true });
    });
}

function create(req, res) {
  models.text
    .max('order')
    .then((maxOrder) => {
      let order = maxOrder;
      if (isNaN(order)) {
        order = 0;
      }
      models.text
      .create({ order: order + 1, title: `New Text #${order + 1}` })
      .then((text) => {
        res.status(201).json({ text });
      })
      .catch(() => {
        res.status(500).json({ errors: 'Could not create text' });
      });
    });
}

function updateChars(req, res) {
  const { newChars, charsToDelete, charsToUpdate } = req.body;
  let charTextsToAdd = [];
  // Find in DB all newChars for this text:
  models.char
    .findAll({
      where: { chinese: { in: newChars.map(x => x.chinese) } }
    })
    .then((chars) => {
      charTextsToAdd = chars.map((char) => {
        return {
          charId: char.id,
          textId: req.params.id,
          manuallyAdded: false,
          order: newChars.find(c => c.chinese === char.chinese).order
        };
      });
      // Create notFoundChars in chars DB (if any):
      let notFoundChars = newChars.filter((x) => {
        return (chars.map(char => char.chinese).indexOf(x.chinese) === -1);
      });
      if (isEmpty(notFoundChars)) {
        return;
      }
      notFoundChars = notFoundChars.map(x => {
        return { chinese: x.chinese };
      });
      models.char
          .bulkCreate(notFoundChars, {returning: true})
          .then((createdChars) => {
          // Add charTexts to charTextsToAdd with IDs of newly created chars:
            return charTextsToAdd.concat(
              createdChars.map(x => {
                return {
                  charId: x.id,
                  textId: req.params.id,
                  manuallyAdded: false,
                  order: newChars.find(c => c.chinese === x.chinese).order
                };
              })
            );
          });
    })
    .then(() => {
      // Create charTexts in DB:
      return models.charText.bulkCreate(charTextsToAdd);
    })
    .then(() => {
      // Destroy charTexts in DB:
      if (isEmpty(charsToDelete)) {
        return;
      }
      CharTextService.destroyCharsToDelete(charsToDelete);
    })
    .then(() => {
      // Update charTexts in DB:
      if (isEmpty(charsToUpdate)) {
        return;
      }
      CharTextService.updateOrder(charsToUpdate);
    })
    .then(() => {
      // Retrieve newly updated list of chars for this text:
      return new CharsGetter(req.params.id)
        .perform()
        .then(chars => {
          return res.status(200).json({ chars });
        });
    });
}

function updateWords(req, res) {
  const { newWords, wordsToDelete, wordsToUpdate } = req.body;
  let wordTextsToAdd = [];
  // Find in DB all newWords for this text:
  models.word
    .findAll({
      where: { chinese: { in: newWords.map(x => x.chinese) } }
    })
    .then((words) => {
      wordTextsToAdd = words.map((word) => {
        return {
          wordId: word.id,
          textId: req.params.id,
          manuallyAdded: false,
          order: newWords.find(w => w.chinese === word.chinese).order
        };
      });
      // Create notFoundWords in chars DB (if any):
      let notFoundWords = newWords.filter((x) => {
        return (words.map(word => word.chinese).indexOf(x.chinese) === -1);
      });
      if (isEmpty(notFoundWords)) {
        return;
      }
      notFoundWords = notFoundWords.map(x => {
        return { chinese: x.chinese };
      });
      models.word
          .bulkCreate(notFoundWords, {returning: true})
          .then((createdWords) => {
          // Add wordTexts to wordTextsToAdd with IDs of newly created words:
            return wordTextsToAdd.concat(
              createdWords.map(x => {
                return {
                  wordId: x.id,
                  textId: req.params.id,
                  manuallyAdded: false,
                  order: newWords.find(w => w.chinese === x.chinese).order
                };
              })
            );
          });
    })
    .then(() => {
      // Create wordTexts in DB:
      return models.wordText.bulkCreate(wordTextsToAdd);
    })
    .then(() => {
      // Destroy wordTexts in DB:
      if (isEmpty(wordsToDelete)) {
        return;
      }
      WordTextService.destroyWordsToDelete(wordsToDelete);
    })
    .then(() => {
      // Update wordTexts in DB:
      if (isEmpty(wordsToUpdate)) {
        return;
      }
      WordTextService.updateOrder(wordsToUpdate);
    })
    .then(() => {
      // Retrieve newly updated list of words for this text:
      TextService.getWords(req.params.id).then(words => {
        // BUG words is not taken after those updates
        return res.status(200).json({ words });
      });
    });
}

// TODO: Link words to chars when adding new words

function getSuggestions(req, res) {
  const textId = req.params.id;
  // const number = req.params.number;
  const currentUserId = req.params.currentUserId;
  const suggestedChars = [];
  let suggestedWords = [];

  // TODO: Handle the case where number !== 0, with suggestedChars
  // TODO: Return elements with status ("Suggestion" or "From {origin}")
  models.user.findOne({
    where: { id: currentUserId }
  }).then((user) => {
    models.text.findOne({
      where: { id: textId }
    }).then((text) => {
      // Find all the previously used chars until this text (included)
      models.char.findAll({
        attributes: ['id'],
        include: [{
          model: models.text,
          where: { order: { $lte: text.order } }
        }]
      }).then((chars) => {
        // Find all the words with at least one previously used chars
        const usedChars = chars.map(c => c.id);
        models.word.findAll({
          where: models.sequelize.and(
            models.sequelize.where(
              models.sequelize.fn(
                'CHAR_LENGTH', models.sequelize.col('word.chinese')
              ),
              { $gt: 1 }
            ),
            { frequency: { $ne: 999999 } },
            { banned: { $not: true } }
          ),
          include: [{
            model: models.char,
            where: { id: { $in: usedChars } }
          }, {
            model: models.text
          }]
        }).then((words) => {
          // Keep only words built only with previously used chars
          let filteredWords = words.filter(w => {
            let keep = true;
            const wordChars = w.chinese.split('');
            const usedCharsInWord = w.chars.map(c => c.chinese);
            wordChars.forEach(c => {
              if (usedCharsInWord.indexOf(c) === -1) {
                keep = false;
              }
              return;
            });
            return keep;
          });
          // Filter out words having a text with order $lte text.order
          filteredWords = filteredWords.filter(w => {
            let keep = true;
            w.texts.forEach(t => {
              if (t.order <= text.order) {
                keep = false;
              }
            });
            return keep;
          });
          // Send back an array of Chinese words and Ids
          filteredWords = filteredWords.sort((a, b) => {
            return a.frequency - b.frequency;
          });
          suggestedWords = filteredWords.map(w => {
            return { id: w.id, chinese: w.chinese };
          });
          return res.status(200).json({
            chars: suggestedChars,
            words: suggestedWords,
            hiddenWords: user.get('hidden_words')
          });
        });
      });
    });
  });
}

module.exports = app => {
  app.get('/api/texts', authenticate, getAll);
  app.get('/api/texts/:id', authenticate, get);
  app.get('/api/texts/:id/chars', authenticate, getChars);
  app.get('/api/texts/:id/words', authenticate, getWords);
  app.put('/api/texts/:id', authenticate, update);
  app.post('/api/texts', authenticate, create);
  app.put('/api/texts/:id/chars', authenticate, updateChars);
  app.put('/api/texts/:id/words', authenticate, updateWords);
  app.get('/api/texts/:id/suggestions/:number/:currentUserId', authenticate, getSuggestions);
};
