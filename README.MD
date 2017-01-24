```
psql -p5432 -d 'kewen-lab'

// Load chars into the DB:
// Note: IDs are ordered by chars frequency
\copy chars(ID,CHINESE) from 'data/chars.csv' DELIMITER ',' CSV

// Load words into the DB:
\copy words(ID,CHINESE) FROM 'data/words.csv' DELIMITER ',' CSV
```
