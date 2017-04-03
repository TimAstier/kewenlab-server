import models from '../models';

export default function WordLinker(word) {
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
    console.log(word.id); // eslint-disable-line no-console
    return models.charWord.bulkCreate(newCharWords);
  });
}
