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
```
psql -p5432 -d 'kewen-lab'

// Load chars into the DB:
\copy chars(FREQUENCY, CHINESE) from 'data/chars.csv' DELIMITER ',' CSV

// Load words into the DB:
\copy words(CHINESE) FROM 'data/words.csv' DELIMITER ',' CSV
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
