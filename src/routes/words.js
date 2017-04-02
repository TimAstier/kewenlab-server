import express from 'express';

import models from '../models';

const router = express.Router();

router.put('/:id/ban', (req, res) => {
  models.word
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
