import isEmpty from 'lodash/isEmpty';
import models from '../models';
import CharTextService from './charText-service';
import TextCharsGetter from './text-chars-getter';

export default function TextCharsUpdater(request) {
  const { newChars, charsToDelete, charsToUpdate, projectId } = request.body;
  const textId = request.params.id;
  let charTextsToAdd = [];
  // Find in DB all newChars for this text:
  return models.char
    .findAll({
      where: { chinese: { in: newChars.map(x => x.chinese) } }
    })
    .then((chars) => {
      charTextsToAdd = chars.map((char) => {
        return {
          charId: char.id,
          textId,
          manuallyAdded: false,
          order: newChars.find(c => c.chinese === char.chinese).order
        };
      });
      // Create notFoundChars in chars DB (if any):
      let notFoundChars = newChars.filter((x) => {
        return (chars.map(char => char.chinese).indexOf(x.chinese) === -1);
      });
      if (isEmpty(notFoundChars)) {
        return true;
      }
      notFoundChars = notFoundChars.map(x => {
        return { chinese: x.chinese };
      });
      return models.char
          .bulkCreate(notFoundChars, { returning: true })
          .then((createdChars) => {
          // Add charTexts to charTextsToAdd with IDs of newly created chars:
            charTextsToAdd = charTextsToAdd.concat(
              createdChars.map(x => {
                return {
                  charId: x.id,
                  textId,
                  manuallyAdded: false,
                  order: newChars.find(c => c.chinese === x.chinese).order
                };
              })
            );
            return charTextsToAdd;
          });
    })
    .then(() => {
      // Create charTexts in DB:
      return models.charText.bulkCreate(charTextsToAdd);
    })
    .then(() => {
      // Destroy charTexts in DB:
      if (isEmpty(charsToDelete)) {
        return true;
      }
      return CharTextService.destroyCharsToDelete(charsToDelete);
    })
    .then(() => {
      // Update charTexts in DB:
      if (isEmpty(charsToUpdate)) {
        return true;
      }
      return CharTextService.updateOrder(charsToUpdate);
    })
    .then(() => {
      // Retrieve newly updated list of chars for this text:
      return TextCharsGetter(textId, projectId);
    });
}
