/**
// TODO: Make this dynamic once all routes are set
 * This module loads dynamically all routes modules located in the routes/
 * directory.
 */

module.exports = function(app) { // eslint-disable-line func-names
  // Load the route files.
  require('./words')(app);
  require('./tokenizer')(app);
  require('./users')(app);
  require('./auth')(app);
  require('./scripts')(app);
};
