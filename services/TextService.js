import { text as Text } from '../models';

export default {
  getChars: (textId) => {
    return Text
      .findOne({ where: { id: textId } })
      .then(text => {
        return text.getChars({
          attributes: ['id', 'chinese'],
          include: [{
            model: Text,
            where: { order: { $lt: text.order } },
            attributes: ['title', 'order'],
            order: [
              ['order', 'DESC']
            ],
            required: false
          }]
        })
      });
  },
  getWords: (textId) => {
    return Text
      .findOne({ where: { id: textId } })
      .then(text => {
        return text.getWords({
          attributes: ['id', 'chinese'],
          include: [{
            model: Text,
            where: { order: { $lt: text.order } },
            attributes: ['title', 'order'],
            order: [
              ['order', 'DESC']
            ],
            required: false
          }]
        })
      });
  }
};
