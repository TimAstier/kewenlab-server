import models from '../models';
import * as wordsUtils from '../utils/wordsUtils';

export default function TextSuggestionsGetter(textId, userId) {
  const suggestedChars = [];
  let suggestedWords = [];

  // TODO: Handle the case where number !== 0, with suggestedChars
  // const number = req.params.number;
  // TODO: Return elements with status ("Suggestion" or "From {origin}")
  return models.user.findOne({
    where: { id: userId }
  }).then((user) => {
    return models.text.findOne({
      where: { id: textId }
    }).then((text) => {
      // Find all the previously used chars until this text (included)
      return models.char.findAll({
        attributes: ['id'],
        include: [{
          model: models.text,
          where: { order: { $lte: text.order } }
        }]
      }).then((chars) => {
        // Find all the words ...
          // with at least one previously used chars
          // filter out banned words
          // filter out hidden words
          // filter out words with no frequency information
        const usedChars = chars.map(c => c.id);
        return models.word.findAll({
          where: models.sequelize.and(
            models.sequelize.where(
              models.sequelize.fn(
                'CHAR_LENGTH', models.sequelize.col('word.chinese')
              ),
              { $gt: 1 }
            ),
            { id: { $notIn: user.get('hidden_words') } },
            { frequency: { $ne: 999999 } },
            { banned: { $not: true } }
          ),
          include: [{
            model: models.char,
            where: { id: { $in: usedChars } }
          }, {
            model: models.text
          }]
        })
        .then((words) => {
          let filteredWords = wordsUtils.filterFullyMatchingWords(words);
          filteredWords = wordsUtils.filterNonUsedWords(filteredWords, text.order);
          filteredWords = wordsUtils.orderByFrequency(filteredWords);
          // Send back an array of Chinese words and Ids
          suggestedWords = filteredWords.map(w => {
            return { id: w.id, chinese: w.chinese };
          });
          return {
            chars: suggestedChars,
            words: suggestedWords
          };
        });
      });
    });
  });
}
