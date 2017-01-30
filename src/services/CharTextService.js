import { charText as CharText } from '../models';

export default {
  destroyCharsToDelete: (charsToDelete) => {
    return CharText
      .destroy({
        where: {
          id: { in: charsToDelete.map(x => x.charText.id) }
        }
      });
  }
};
