import { charText as CharText } from '../models';

export default {
  destroyCharsToDelete: (charsToDelete) => {
    return CharText
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
    return charsToUpdate.forEach(char => {
      CharText
        .update(
          { order: char.order },
          { where: { id: char.charTextId } }
        );
    });
  }
};
