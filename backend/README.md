# Use MongoDB as a database and load the mflix sample

for some movies the year is a String with an "è" at the end (ex. 2012è)
to solve, run the following command in MongoDB NoSQL Booster or another app you use to interact with the database

```sql
db.movies.updateMany(
  { "year": { $regex: /\d{4}è$/ } },
  [
    {
      $set: {
        "year": {
          $toInt: { $substr: ["$year", 0, 4] }
        }
      }
    }
  ]
)
```
