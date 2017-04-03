import models from '../models';

export default function TextContentUpdater(textId, content) {
  return models.text
    .update(
      { content },
      { where: { id: textId } }
    );
}
