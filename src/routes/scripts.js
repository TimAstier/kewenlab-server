import express from 'express';

import models from '../models';

const router = express.Router();

function linkWord(word) {
  const chars = word.chinese.split('');
  // TODO: create chars if they do not exist
  models.char.findAll({
    where: { chinese: { $in: chars } }
  }).then(chars => {
    const newCharWords = [];
    chars.forEach(c => {
      newCharWords.push({
        charId: c.id,
        wordId: word.id
      });
    });
    // console.log(word.id);
    return CharWord.bulkCreate(newCharWords);
  });
}

router.get('/', () => {
  model.word.findAll().then(words => {
    words.forEach(w => {
      linkWord(w);
    });
  });
});

router.get('/:id', () => {
  const id = req.params.id;
  model.word.findOne({
    where: { id: id }
  }).then(w => {
    linkWord(w);
  });
});

export default router;
