const Liana = require('forest-express-sequelize');
const models = require('../models');
const _ = require('lodash');

Liana.collection('char', {
  segments: [{
    name: 'used',
    where: () => {
      const query = 'SELECT * FROM chars WHERE EXISTS (SELECT * FROM "charTexts" WHERE "charTexts"."charId" = chars.id);';

      return models.sequelize
        .query(query)
        .then((chars) => {
          return { id: { $in: _.map(chars[0], 'id') }};
        });
    }
  }, {
    name: 'not used',
    where: () => {
      const query = 'SELECT * FROM chars WHERE NOT EXISTS (SELECT * FROM "charTexts" WHERE "charTexts"."charId" = chars.id);';

      return models.sequelize
        .query(query)
        .then((chars) => {
          return { id: { $in: _.map(chars[0], 'id') }};
        });
    }
  }]
});
