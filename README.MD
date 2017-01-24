Command to load words into the DB:
```
psql -p5432 -d 'kewen-lab'
\copy words(ID,CHINESE) FROM 'words.csv' DELIMITER ',' CSV
