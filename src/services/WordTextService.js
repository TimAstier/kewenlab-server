import { wordText as WordText } from '../models';

export default {
  destroyWordsToDelete: (wordsToDelete) => {
    return WordText
      .destroy({
        // We do not destroy items that were manually altered
        where: {
          id: { in: wordsToDelete.map(x => x.wordTextId) },
          manuallyAdded: false,
          manuallyDeleted: false
        }
      });
  },
  updateOrder: (wordsToUpdate) => {
    var promises = [];
    wordsToUpdate.forEach((word, i) => {
      var newPromise = WordText.update(
        { order: word.order },
        { where: { id: word.wordTextId } }
      );
      promises.push(newPromise);
    });
    return Promise.all(promises);
  }
};
