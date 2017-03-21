# Kewen-lab-server
The application is built with express.  
It is based on the [Express & ES6 REST API Boilerplate](https://github.com/developit/express-es6-rest-api).

## Development
```
$ npm install
$ npm run dev
```

## Deployment
The app is deployed to Heroku.
```
heroku create kewen-lab-server --remote production
git push production master
heroku addons:create heroku-postgresql:hobby-dev --remote production
```

## Database seed for chars and words
```js
/** connect to DB **/
psql -p5432 -d 'kewen-lab' // development
heroku pg:psql --remote staging // staging
heroku pg:psql --remote production // production

/** Load chars into the DB **/
// dev and prod
\copy chars(FREQUENCY, CHINESE) from 'data/chars.csv' DELIMITER ',' CSV
// staging
\copy chars(FREQUENCY, CHINESE) from 'data/chars_test.csv' DELIMITER ',' CSV

/** Load words with FQ into the DB **/
// dev and prod
\copy words(FREQUENCY, CHINESE) from 'src/data/words.csv' DELIMITER ',' CSV
// staging
\copy words(FREQUENCY, CHINESE) from 'src/data/words_test.csv' DELIMITER ',' CSV

/** Link words to chars **/
// This can take a few minutes
'ROOT_URL/api/scripts' // Visit this URL one time
```


## Environment variables
- DATABASE_URL=
- FOREST_ENV_SECRET=
- FOREST_AUTH_SECRET=
- JWT_SECRET=
- CLIENT_URL=

## Environments
- development - http://localhost:8080
- staging - https://damp-shelf-57274.herokuapp.com
- production - https://kewen-lab-server.herokuapp.com

## TODO
- [ ] Try to get a save of the DB and restore it.
- [ ] Link words to chars when creating a new word in the DB.
- [ ] Possibility to customize nodejieba with our own dictionary.
