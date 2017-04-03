import models from '../models';

export default function TextCreator() {
  return models.text
    .max('order')
    .then((maxOrder) => {
      let order = maxOrder;
      if (isNaN(order)) {
        order = 0;
      }
      return models.text
        .create({ order: order + 1, title: `New Text #${order + 1}` })
        .then(text => {
          if (text) {
            return text;
          }
          throw { status: 500, message: 'Could not create text' };
        });
    });
}
