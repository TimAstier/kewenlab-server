import express from 'express';

import { text as Text } from '../models';

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
