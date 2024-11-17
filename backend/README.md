# Use MongoDB as a database and load the mflix sample

for some movies the year is a String with an "è" at the end (e.g. 2012è)
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

some series have the year as a String like (e.g. 2006è2012)
use the following command for those

```sql
db.movies.updateMany(
  { "year": { $regex: /^\d{4}[^0-9]*\d{4}$/ } },
  [
    {
      $set: {
        "year": {
          $toInt: {
            $substr: [
              { $arrayElemAt: [{ $split: ["$year", "è"] }, 1] },
              0,
              4
            ]
          }
        }
      }
    }
  ]
)
```
