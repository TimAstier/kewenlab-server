import models from '../models';

export default function TextsGetter() {
  return models.text
    .findAll({
      attributes: ['id', 'order', 'title'],
      order: [
        ['order', 'ASC']
      ]
    });
}
