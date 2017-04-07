module.exports = {
  ref: 'id',
  attributes: ['title', 'user', 'texts'],
  keyForAttribute: 'camelCase',
  user: {
    ref: 'id',
    attributes: ['username'],
    include: false
  },
  texts: {
    ref: 'id',
    attributes: ['title'],
    include: false
  }
};
