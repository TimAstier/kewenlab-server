import isEmpty from 'lodash/isEmpty';
import models from '../models';
import WordTextService from './wordText-service';
import TextWordsGetter from './text-words-getter';

export default function TextCharsUpdater(request) {
  const { newWords, wordsToDelete, wordsToUpdate, projectId } = request.body;
  const textId = request.params.id;
  let wordTextsToAdd = [];
  // Find in DB all newWords for this text:
  return models.word
    .findAll({
      where: { chinese: { in: newWords.map(x => x.chinese) } }
    })
    .then((words) => {
      wordTextsToAdd = words.map((word) => {
        return {
          wordId: word.id,
          textId,
          manuallyAdded: false,
          order: newWords.find(w => w.chinese === word.chinese).order
        };
      });
      // Create notFoundWords in chars DB (if any):
      let notFoundWords = newWords.filter((x) => {
        return (words.map(word => word.chinese).indexOf(x.chinese) === -1);
      });
      if (isEmpty(notFoundWords)) {
        return true;
      }
      notFoundWords = notFoundWords.map(x => {
        return { chinese: x.chinese };
      });
      return models.word
          .bulkCreate(notFoundWords, { returning: true })
          .then((createdWords) => {
          // Add wordTexts to wordTextsToAdd with IDs of newly created words:
            wordTextsToAdd = wordTextsToAdd.concat(
              createdWords.map(x => {
                return {
                  wordId: x.id,
                  textId,
                  manuallyAdded: false,
                  order: newWords.find(w => w.chinese === x.chinese).order
                };
              })
            );
            return wordTextsToAdd;
          });
    })
    .then(() => {
      // TODO: Link words to chars when adding new words
      // Create wordTexts in DB:
      return models.wordText.bulkCreate(wordTextsToAdd);
    })
    .then(() => {
      // Destroy wordTexts in DB:
      if (isEmpty(wordsToDelete)) {
        return true;
      }
      return WordTextService.destroyWordsToDelete(wordsToDelete);
    })
    .then(() => {
      // Update wordTexts in DB:
      if (isEmpty(wordsToUpdate)) {
        return true;
      }
      return WordTextService.updateOrder(wordsToUpdate);
    })
    .then(() => {
      // Retrieve newly updated list of chars for this text:
      return TextWordsGetter(textId, projectId);
    });
}
