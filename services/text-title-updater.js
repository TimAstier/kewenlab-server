import models from '../models';

export default function TextTitleUpdater(request) {
  const textId = request.params.id;
  const title = request.body.title;

  return models.text
    .update(
      { title },
      { where: { id: textId }, returning: true }
    )
    .then(affected => {
      if (!affected[0]) {
        throw { status: 500, message: 'Could not save text title' };
      }
      return affected;
    });
}
