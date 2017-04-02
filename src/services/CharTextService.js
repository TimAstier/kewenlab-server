import models from '../models';

export default {
  destroyCharsToDelete: (charsToDelete) => {
    return models.charText
      .destroy({
        // We do not destroy items that were manually altered
        where: {
          id: { in: charsToDelete.map(x => x.charTextId) },
          manuallyAdded: false,
          manuallyDeleted: false
        }
      });
  },
  updateOrder: (charsToUpdate) => {
    const promises = [];
    charsToUpdate.forEach((char) => {
      const newPromise = models.charText.update(
        { order: char.order },
        { where: { id: char.charTextId } }
      );
      promises.push(newPromise);
    });
    return Promise.all(promises);
  }
};
