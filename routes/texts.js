import express from 'express';
import isEmpty from 'lodash/isEmpty';

import { text as Text } from '../models';
import { char as Char } from '../models';
import { charText as CharText } from '../models';

import TextService from '../services/TextService';
import CharTextService from '../services/CharTextService';

let router = express.Router();

router.get('/', (req, res) => {
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

router.get('/:id', (req, res) => {
  Text
    .findOne({ where: { id: req.params.id } })
    .then(text => {
      res.json({ text });
    });
});

router.get('/:id/chars', (req, res) => {
  return TextService.getChars(req.params.id).then(chars => {
    return res.status(200).json({ chars });
  });;
});

router.get('/:id/words', (req, res) => {
  Text
    .findOne({ where: { id: req.params.id } })
    .then(text => {
      text.getWords({ attributes: ['id', 'chinese'] })
      .then(words => {
        res.status(200).json({ words });
      });
    });
});

router.put('/:id', (req, res) => {
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

router.put('/:id/chars', (req, res) => {
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
          textId: req.params.id
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
                  return { charId: x.id, textId: req.params.id };
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

export default router;
