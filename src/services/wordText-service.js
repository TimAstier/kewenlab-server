import models from '../models';

export default {
  destroyWordsToDelete: (wordsToDelete) => {
    return models.wordText
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
    const promises = [];
    wordsToUpdate.forEach((word) => {
      const newPromise = models.wordText.update(
        { order: word.order },
        { where: { id: word.wordTextId } }
      );
      promises.push(newPromise);
    });
    return Promise.all(promises);
  }
};
