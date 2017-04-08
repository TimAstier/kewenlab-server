import models from '../models';

export default function TextContentUpdater(textId, content) {
  return models.text
    .update(
      { content },
      { where: { id: textId }, returning: true }
    )
    .then(affected => {
      if (!affected[0]) {
        throw { status: 500, message: 'Could not save text content' };
      }
      return affected;
    });
}
