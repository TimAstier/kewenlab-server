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

## Database
Daily backups are scheduled in staging and prod at 02:00 America/Los_Angeles.
Restore Heroku dump in local DB:
```
// If starting from existing DB
$ sequelize db:migrate:undo:all
$ pg_restore --verbose --clean --no-acl --no-owner -h localhost -U username -d dbname latest.dump
```

## Database seed for chars and words
```js
/** connect to DB **/
psql -p5432 -d 'kewen-lab' // development
heroku pg:psql --remote staging // staging
heroku pg:psql --remote production // production

/** Load chars into the DB **/
// dev and prod
\copy chars(FREQUENCY, CHINESE) from 'src/data/chars.csv' DELIMITER ',' CSV
// staging
\copy chars(FREQUENCY, CHINESE) from 'src/data/chars_test.csv' DELIMITER ',' CSV

/** Load words with FQ into the DB **/
// dev and prod
\copy words(FREQUENCY, CHINESE) from 'src/data/words.csv' DELIMITER ',' CSV
// staging
\copy words(FREQUENCY, CHINESE) from 'src/data/words_test.csv' DELIMITER ',' CSV

/** Link words to chars **/

// Option 1: Visit this URL one time (can take a few minutes)
'http://localhost:8080/api/scripts' // dev
'https://damp-shelf-57274.herokuapp.com/api/scripts' // staging

// Option 2: Upload from data csv file
\copy "charWords" from 'src/data/charWords.csv' DELIMITER ',' CSV HEADER
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

## Misc
- [Upgrading Heroku Postgres DB](https://devcenter.heroku.com/articles/upgrading-heroku-postgres-databases)
- [Heroku Postgres Import/Export](https://devcenter.heroku.com/articles/heroku-postgres-import-export)

## TODO
- [x] Link words to chars offline and get the result in a data file.
- [x] Schedule DB backups
- [ ] Link words to chars when creating a new word in the DB.
- [ ] Add new chars if not exist when linking words to chars
- [ ] Possibility to customize nodejieba with our own dictionary.
