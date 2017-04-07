import models from '../models';

export default function TextGetter(id) {
  return models.text
    .findOne({
      where: { id },
      attributes: ['id', 'title', 'content']
    });
}
