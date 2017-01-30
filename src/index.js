import config from './config/config';

import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';

import { sequelize } from './models';
import users from './routes/users';
import auth from './routes/auth';
import texts from './routes/texts';
import tokenizer from './routes/tokenizer';

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
app.use('/api/texts', texts);
app.use('/api/tokenizer', tokenizer);

const port = process.env.PORT || 8080;

app.listen(port, () => console.log('Server is running on port ' + port));
