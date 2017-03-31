import express from 'express';

import { word as Word } from '../models';

const router = express.Router();

router.put('/:id/ban', (req, res) => {
  Word
    .findOne({ where: { id: req.params.id } })
    .then((word) => {
      word.banned = true;
      return word.save();
    })
    .then(() => {
      res.status(204).send('Word ' + req.params.id + ' banned');
    });
});

export default router;
