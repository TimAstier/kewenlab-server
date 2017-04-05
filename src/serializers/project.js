'use strict';
const JSONAPISerializer = require('jsonapi-serializer').Serializer;
const serializerOptions = require('./schemas/project');

module.exports = new JSONAPISerializer('projects', serializerOptions);
