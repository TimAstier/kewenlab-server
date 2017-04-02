const Liana = require('forest-express-sequelize');
const models = require('../src/models');
const _ = require('lodash');

Liana.collection('word', {
  segments: [{
    name: 'used',
    where: () => {
      const query = 'SELECT * FROM words WHERE EXISTS (SELECT * FROM "wordTexts" WHERE "wordTexts"."wordId" = words.id);';

      return models.sequelize
        .query(query)
        .then((words) => {
          return { id: { $in: _.map(words[0], 'id') }};
        });
    }
  }, {
    name: 'not used',
    where: () => {
      const query = 'SELECT * FROM words WHERE NOT EXISTS (SELECT * FROM "wordTexts" WHERE "wordTexts"."wordId" = words.id);';

      return models.sequelize
        .query(query)
        .then((words) => {
          return { id: { $in: _.map(words[0], 'id') }};
        });
    }
  }]
});
