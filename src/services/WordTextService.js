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
    return wordsToUpdate.forEach(word => {
      WordText
        .update(
          { order: word.order },
          { where: { id: word.wordTextId } }
        );
    });
  }
};
