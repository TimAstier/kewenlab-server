import express from 'express';
import authenticate from '../middlewares/authenticate.js';
import isEmpty from 'lodash/isEmpty';

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
  const { newChars, charsToDelete } = req.body;
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
          manuallyAdded: false
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
                    manuallyAdded: false
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
      // Retrieve newly updated list of chars for this text:
      return TextService.getChars(req.params.id).then(chars => {
        return res.status(200).json({ chars });
      });
    });
});

router.put('/:id/words', authenticate, (req, res) => {
  const { newWords, wordsToDelete } = req.body;
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
          manuallyAdded: false
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
                    manuallyAdded: false
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
      // Retrieve newly updated list of words for this text:
      return TextService.getWords(req.params.id).then(words => {
        return res.status(200).json({ words });
      });
    });
});

export default router;
