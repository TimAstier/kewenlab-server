import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';

const databaseOptions = {
  logging: false,
  //logging: console.log,
  pool: { maxConnections: 10, minConnections: 1 }
};
if (process.env.SSL_DATABASE) {
  databaseOptions.dialectOptions = { ssl: true };
}

let sequelize = new Sequelize(process.env.DATABASE_URL, databaseOptions);
let db = {};
fs
  .readdirSync(__dirname)
  .filter(function (file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js');
  })
  .forEach(function (file) {
    try {
      var model = sequelize['import'](path.join(__dirname, file));
      db[model.name] = model;
    } catch (error) {
      // This produces errors in build for unknown reason:
      //console.error('Model creation error: ' + error);
    }
  });
Object.keys(db).forEach(function(modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;
