≡ Quick Start Guide

# Authorization and registration by means of Passport Js and Nest Js

## Features

- There is no ormconfig.json file in the assembly
- Tested on MySql base
- The authorization strategy is passport-jwt and passport-local

## Sample ormconfig.json

```
{
     "type": "mysql",
     "host": "localhost",
     "port": 3306,
     "username": "db_login",
     "password": "db_password",
     "database": "db_name",
     "entities": [
         "dist / ** / *. entity {.ts, .js}"
     ],
     "synchronize": true // Used to generate tables, do not use in production version
}
```
