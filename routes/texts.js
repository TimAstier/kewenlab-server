import express from 'express';

import { text as Text } from '../models';
import { char as Char } from '../models';

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
  Text
    .findOne({ where: { id: req.params.id } })
    .then(text => {
      text.getChars({
        attributes: ['id', 'chinese'],
        include: [{
          model: Text,
          where: { order: { $lt: text.order } },
          attributes: ['title', 'order'],
          order: [
            ['order', 'DESC']
          ],
          required: false
        }]
      })
      .then(chars => {
        res.status(200).json({ chars });
      });
    });
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
  const { id, content } = req.body;
  Text
    .update(
      { content },
      { where: { id } }
    )
    .then(() => {
      res.status(200).json({ success: true });
    });
});

export default router;
