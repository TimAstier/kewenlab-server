import { charText as CharText } from '../models';

export default {
  destroyCharsToDelete: (charsToDelete) => {
    console.log('test');
    console.log(charsToDelete);
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
    var promises = [];
    charsToUpdate.forEach((char, i) => {
      var newPromise = CharText.update(
        { order: char.order },
        { where: { id: char.charTextId } }
      );
      promises.push(newPromise);
    });
    return Promise.all(promises);
  }
};
