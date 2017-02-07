import { charText as CharText } from '../models';

export default {
  destroyCharsToDelete: (charsToDelete) => {
    return CharText
      .destroy({
        // We do not destroy items that were manually altered
        where: {
          id: { in: charsToDelete.map(x => x.charText.id) },
          manuallyAdded: false,
          manuallyDeleted: false
        }
      });
  }
};
