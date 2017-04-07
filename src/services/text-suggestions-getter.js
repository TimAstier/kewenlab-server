/* eslint-disable camelcase */
import models from '../models';
import * as wordsUtils from '../utils/wordsUtils';
import isEmpty from 'lodash/isEmpty';

export default function TextSuggestionsGetter(textId, userId, projectId) {
  const suggestedChars = [];
  let suggestedWords = [];

  // TODO: Handle the case where number !== 0, with suggestedChars
  // const number = req.params.number;
  // TODO: Return elements with status ("Suggestion" or "From {origin}")
  return models.user.findOne({
    where: { id: userId }
  }).then((user) => {
    const { favorite_words } = user.get({ plain: true });
    let { hidden_words } = user.get({ plain: true });
    // Workaround to avoid Sequelize bug with $notIn and empty arrays
    // https://github.com/sequelize/sequelize/pull/4860
    if (isEmpty(hidden_words)) { hidden_words = [0]; }
    return models.text.findOne({
      where: { id: textId },
      include: [{
        model: models.textProject,
        where: [{ textId }, { projectId }]
      }]
    }).then((text) => {
      const order = text.textProjects[0].order;
      // Find previously used chars until this text (included) in this project
      return models.char.findAll({
        attributes: ['id'],
        include: [{
          model: models.text,
          include: [{
            model: models.textProject,
            where: [{ order: { $lte: order } }, { projectId }]
          }]
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
            { id: { $notIn: hidden_words } },
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
          // Send back an array of Chinese words, Ids and favorite info
          suggestedWords = filteredWords.map(w => {
            const favorite = favorite_words.indexOf(w.id) !== -1;
            return {
              id: w.id,
              chinese: w.chinese,
              favorite
            };
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
