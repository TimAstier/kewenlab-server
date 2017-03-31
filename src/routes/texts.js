import express from 'express';
import authenticate from '../middlewares/authenticate.js';
import isEmpty from 'lodash/isEmpty';

import models from '../models';
import { text as Text } from '../models';
import { char as Char } from '../models';
import { charText as CharText } from '../models';
import { word as Word } from '../models';
import { wordText as WordText } from '../models';

import TextService from '../services/TextService';
import CharTextService from '../services/CharTextService';
import WordTextService from '../services/WordTextService';

let router = express.Router();

router.get('/', authenticate, (req, res) => {
  Text
    .findAll({
      attributes: ['id', 'order', 'title'],
      order: [
        ['order', 'ASC']
      ]
    })
    .then(texts => {
      res.json({ texts });
    });
});

router.get('/:id', authenticate, (req, res) => {
  Text
    .findOne({
      where: { id: req.params.id },
      attributes: ['id', 'title', 'content', 'order']
    })
    .then(text => {
      res.json({ text });
    });
});

router.get('/:id/chars', authenticate, (req, res) => {
  return TextService.getChars(req.params.id).then(chars => {
    return res.status(200).json({ chars });
  });
});

router.get('/:id/words', authenticate, (req, res) => {
  return TextService.getWords(req.params.id).then(words => {
    return res.status(200).json({ words });
  });
});

router.put('/:id', authenticate, (req, res) => {
  const { content } = req.body;
  Text
    .update(
      { content },
      { where: { id: req.params.id } }
    )
    .then(() => {
      res.status(200).json({ success: true });
    });
});

router.post('/', authenticate, (req, res) => {
  Text
    .max('order')
    .then((maxOrder) => {
      if (isNaN(maxOrder)) {
        maxOrder = 0;
      }
      Text
      .create({ order: maxOrder + 1, title: `New Text #${maxOrder + 1}` })
      .then((text) => {
        res.status(201).json({ text });
      })
      .catch((error) => {
        res.status(500).json({ errors: 'Could not create text' });
      });
    });
});

router.put('/:id/chars', authenticate, (req, res) => {
  const { newChars, charsToDelete, charsToUpdate } = req.body;
  let charTextsToAdd = [];
  // Find in DB all newChars for this text:
  Char
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
      } else {
        notFoundChars = notFoundChars.map(x => {
          return { chinese: x.chinese };
        });
        return Char
            .bulkCreate(notFoundChars, {returning: true})
            .then((createdChars) => {
            // Add charTexts to charTextsToAdd with IDs of newly created chars:
              return charTextsToAdd = charTextsToAdd.concat(
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
      }
    })
    .then(() => {
      // Create charTexts in DB:
      return CharText.bulkCreate(charTextsToAdd);
    })
    .then(() => {
      // Destroy charTexts in DB:
      if (isEmpty(charsToDelete)) {
        return;
      } else {
        return CharTextService.destroyCharsToDelete(charsToDelete);
      }
    })
    .then(() => {
      // Update charTexts in DB:
      if (isEmpty(charsToUpdate)) {
        return;
      } else {
        return CharTextService.updateOrder(charsToUpdate);
      }
    })
    .then(() => {
      // Retrieve newly updated list of chars for this text:
      return TextService.getChars(req.params.id).then(chars => {
        return res.status(200).json({ chars });
      });
    });
});

router.put('/:id/words', authenticate, (req, res) => {
  const { newWords, wordsToDelete, wordsToUpdate } = req.body;
  let wordTextsToAdd = [];
  // Find in DB all newWords for this text:
  Word
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
      } else {
        notFoundWords = notFoundWords.map(x => {
          return { chinese: x.chinese };
        });
        return Word
            .bulkCreate(notFoundWords, {returning: true})
            .then((createdWords) => {
            // Add wordTexts to wordTextsToAdd with IDs of newly created words:
              return wordTextsToAdd = wordTextsToAdd.concat(
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
      }
    })
    .then(() => {
      // Create wordTexts in DB:
      return WordText.bulkCreate(wordTextsToAdd);
    })
    .then(() => {
      // Destroy wordTexts in DB:
      if (isEmpty(wordsToDelete)) {
        return;
      } else {
        return WordTextService.destroyWordsToDelete(wordsToDelete);
      }
    })
    .then(() => {
      // Update wordTexts in DB:
      if (isEmpty(wordsToUpdate)) {
        return;
      } else {
        return WordTextService.updateOrder(wordsToUpdate);
      }
    })
    .then(() => {
      // Retrieve newly updated list of words for this text:
      return TextService.getWords(req.params.id).then(words => {
        return res.status(200).json({ words });
      });
    });
});

// TODO: Link words to chars when adding new words

router.get('/:id/suggestions/:number', authenticate, (req, res) => {
  const textId = req.params.id;
  const number = req.params.number;
  let suggestedChars = [];
  let suggestedWords = [];

  // TODO: Handle the case where number !== 0, with suggestedChars
  // TODO: Return elements with status ("Suggestion" or "From {origin}")

  Text.findOne({
    where: { id: textId }
  }).then((text) => {
    // Find all the previously used chars until this text (included)
    Char.findAll({
      attributes: ['id'],
      include: [{
        model: Text,
        where: { order: { $lte: text.order } }
      }]
    }).then((chars) => {
      // Find all the words with at least one previously used chars
      const usedChars = chars.map(c => c.id);
      Word.findAll({
        // where: {
        //   frequency: { $ne: 999999 },
        //   chineseLength: models.sequelize.where(
        //     models.sequelize.fn(
        //       'CHAR_LENGTH', models.sequelize.col('words.chinese')
        //     ),
        //     { $gt: 1 }
        //   )
        // },
        where: models.sequelize.and(
          models.sequelize.where(
            models.sequelize.fn(
              'CHAR_LENGTH', models.sequelize.col('word.chinese')
            ),
            { $gt: 1 }
          ),
          { frequency: { $ne: 999999 } }
        ),
        include: [{
          model: Char,
          where: { id: { $in: usedChars } }
        }, {
          model: Text
        }]
      }).then((words) => {
        // Keep only words built only with previously used chars
        words = words.filter(w => {
          let keep = true;
          let wordChars = w.chinese.split('');
          let usedCharsInWord = w.chars.map(c => c.chinese);
          wordChars.forEach(c => {
            if (usedCharsInWord.indexOf(c) === -1) {
              return keep = false;
            }
            return;
          });
          return keep;
        });
        // Filter out words having a text with order $lte text.order
        words = words.filter(w => {
          let keep = true;
          w.texts.forEach(t => {
            if (t.order <= text.order) {
              keep = false;
            }
          });
          return keep;
        });
        // Send back only an array of Chinese words
        words = words.sort((a, b) => {
          return a.frequency - b.frequency;
        });
        suggestedWords = words.map(w => w.chinese);
        return res.status(200).json({
          chars: suggestedChars,
          words: suggestedWords
        });
      });
    });
  });

});

export default router;
