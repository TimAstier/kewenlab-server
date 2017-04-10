import config from './config'; // eslint-disable-line no-unused-vars

import express from 'express';
import bodyParser from 'body-parser';

import { sequelize } from './models';

const app = express();

// TODO: Only allow JSON, see Forest example
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({limit: '5mb', extended: true}));

// Forest Admin setup
app.use(require('forest-express-sequelize').init({
  modelsDir: __dirname + '/models',
  envSecret: process.env.FOREST_ENV_SECRET,
  authSecret: process.env.FOREST_AUTH_SECRET,
  sequelize
}));

// Enable CORS to allow requests from the client
app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', process.env.CLIENT_URL);
  response.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

require('./routes')(app);

// Errors handling
app.use((err, req, res, next) => {
  let { message } = err;
  const { status } = err;

  // NOTICE: Display the first error message if it is a Sequelize validation
  //         error message.
  if (err && err.errors && err.errors[0] && err.errors[0].message) {
    message = err.errors[0].message;
  }

  res
    .status(err.status || 400)
    .send({ errors: [{ status, message }] });
  next(err);
});

const port = process.env.PORT || 8080;

app.listen(port, () => console.log('Server is running on port ' + port)); // eslint-disable-line no-console
