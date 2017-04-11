import models from '../models';

export default function ProjectTextsUpdater(textItemsToUpdate, projectId) {
  const promises = [];
  textItemsToUpdate.forEach((t) => {
    // console.log(t. + ' - ' + t.order)
    const newPromise = models.textProject
      .update(
        { order: t.localIndex },
        { where: { textId: t.id, projectId } }
      );
    promises.push(newPromise);
  });
  return Promise.all(promises);
}
