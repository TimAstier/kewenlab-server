import models from '../models';

export default function TextBonusUpdater(request) {
  const textId = request.params.id;
  const projectId = request.body.currentProjectId;
  const bonus = request.body.checked;

  return models.textProject
    .update(
      { bonus },
      { where: { textId, projectId }, returning: true }
    )
    .then(affected => {
      if (!affected[0]) {
        throw { status: 500, message: 'Could not mark text as bonus' };
      }
      return affected;
    });
}
