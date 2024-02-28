# Create database

```sh
psql -d postgres
CREATE DATABASE uxshowgo_development
```

## Edit .env file

```.env
# edit [user], [password] and [database] according to your settings
DATABASE_URL="postgresql://[user]:[password]@localhost:5432/[database]?schema=public"

# example
DATABASE_URL="postgresql://ken@localhost:5432/uxshowgo_development?schema=public"
```

## Add new user for the app (optional)

```sh
psql -d postgres

CREATE ROLE newuser WITH LOGIN PASSWORD 'password';

ALTER ROLE newuser CREATEDB;

# go to new db and run these
GRANT ALL PRIVILEGES ON DATABASE exampledb TO newuser;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO newuser;
GRANT USAGE, CREATE ON SCHEMA public TO newuser;

# show users
\du
```

### change password

```sh
ALTER USER newuser WITH PASSWORD 'newpassword';
```

### Login

```sh
psql -U [username] -d [database] -h [host] -p [port]
```
