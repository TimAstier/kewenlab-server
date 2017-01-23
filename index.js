import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';

import { sequelize } from './models';
import users from './routes/users';
import auth from './routes/auth';
import events from './routes/events';
import texts from './routes/texts';

let app = express();

app.use(bodyParser.json());

app.use(require('forest-express-sequelize').init({
  modelsDir: __dirname + '/models',
  envSecret: process.env.FOREST_ENV_SECRET,
  authSecret: process.env.FOREST_AUTH_SECRET,
  sequelize
}));

// TODO: Protect the API to authenticated users only
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/events', events);
app.use('/api/texts', texts);

app.listen(8080, () => console.log('Running on localhost:8080'));
