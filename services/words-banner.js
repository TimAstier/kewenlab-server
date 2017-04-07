import models from '../models';

export default function WordsBanner(wordId) {
  return models.word
    .findOne({ where: { id: wordId } })
    .then((word) => {
      word.banned = true;
      word.save();
    });
}
