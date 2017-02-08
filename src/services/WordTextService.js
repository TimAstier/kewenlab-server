import { wordText as WordText } from '../models';

export default {
  destroyWordsToDelete: (wordsToDelete) => {
    return WordText
      .destroy({
        // We do not destroy items that were manually altered
        where: {
          id: { in: wordsToDelete.map(x => x.charTextId) },
          manuallyAdded: false,
          manuallyDeleted: false
        }
      });
  }
};
