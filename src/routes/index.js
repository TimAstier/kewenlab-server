/**
 * This module loads dynamically all routes modules located in the routes/
 * directory.
 */

'use strict';
import fs from 'fs';
import path from 'path';

module.exports = app => {
  fs.readdirSync('./src/routes').forEach(file => {
    // Avoid to read this current file and hidden files.
    if (file[0] === '.' || file === path.basename(__filename)) {
      return;
    }

    // Load the route file.
    require('./' + file)(app);
  });
};
