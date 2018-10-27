# Kewen-lab-server

A tool to create and manage content for the ChineseMe course.

## No longer maintained

_This tool is no longer maintained nor available online. This repository is published here as a reference._

## Development

```bash
$ npm install
$ npm run dev
```

## Deployment

The app is deployed to Heroku.

```bash
$ heroku create kewen-lab-server --remote production
$ git push production master
$ heroku addons:create heroku-postgresql:hobby-dev --remote production
```

## Database

Daily backups are scheduled in staging and prod at 02:00 America/Los_Angeles.

Before every save of text content, the current content is displayed in the growser logs and in the server logs.
To see logs on the server:

```
$ heroku logs [--tail] --source app --remote production
```

Restore dump in local DB:

```bash
# If starting from existing DB
$ sequelize db:migrate:undo:all
$ pg_restore --verbose --clean --no-acl --no-owner -h localhost -U timotheeastier -d kewen-lab latest.dump
```

Restore dump in Heroku App:

```
$ heroku pg:backups:restore 'https://s3.amazonaws.com/me/items/XXXX/mydb.dump' DATABASE_URL --remote production
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

See .env.example file.

## Environments

- development - http://localhost:8080
- staging - https://damp-shelf-57274.herokuapp.com
- production - https://kewen-lab-server.herokuapp.com
