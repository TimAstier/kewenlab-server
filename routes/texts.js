import express from 'express';

import { text as Text } from '../models';

let router = express.Router();

router.get('/', (req, res) => {
  Text
    .findAll({
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

export default router;
