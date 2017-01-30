```
psql -p5432 -d 'kewen-lab'

// Load chars into the DB:
// Note: IDs are ordered by chars frequency
\copy chars(FREQUENCY, CHINESE) from 'data/chars.csv' DELIMITER ',' CSV

// Load words into the DB:
\copy words(CHINESE) FROM 'data/words.csv' DELIMITER ',' CSV
```

Express & ES6 REST API Boilerplate
==================================

This is a straightforward boilerplate for building REST APIs with ES6 and Express.

- ES6 support via [babel](https://babeljs.io)
- REST resources as middleware via [resource-router-middleware](https://github.com/developit/resource-router-middleware)
- CORS support via [cors](https://github.com/troygoode/node-cors)
- Body Parsing via [body-parser](https://github.com/expressjs/body-parser)

Getting Started
---------------

```sh
# clone it
git clone git@github.com:developit/express-es6-rest-api.git
cd express-es6-rest-api

# Make it your own
rm -rf .git && git init && npm init

# Install dependencies
npm install

# Start development live-reload server
PORT=8080 npm run dev

# Start production server:
PORT=8080 npm start
