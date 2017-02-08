import { charText as CharText } from '../models';

export default {
  destroyCharsToDelete: (charsToDelete) => {
    console.log(charsToDelete)
    return CharText
      .destroy({
        // We do not destroy items that were manually altered
        where: {
          id: { in: charsToDelete.map(x => x.charTextId) },
          manuallyAdded: false,
          manuallyDeleted: false
        }
      });
  }
};
