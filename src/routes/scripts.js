import express from 'express';

import { char as Char } from '../models';
import { word as Word } from '../models';
import { charWord as CharWord } from '../models';

let router = express.Router();

function linkWord(word) {
  const chars = word.chinese.split('');
  // TODO: create chars if they do not exist
  Char.findAll({
    where: { chinese: { $in: chars } }
  }).then(chars => {
    let newCharWords = [];
    chars.forEach(c => {
      newCharWords.push({
        charId: c.id,
        wordId: word.id
      });
    });
    return CharWord.bulkCreate(newCharWords);
  });
}

router.get('/', (req, res) => {
  Word.findOne({
    where: { id: 140279 }
  }).then(word => {
    linkWord(word);
  }).then(() => {
    res.json('Done');
  });
});

export default router;
