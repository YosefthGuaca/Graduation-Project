[Ux Show Go]

# Ux Show Go

## Set up

```sh
npm run setup
npm run prepare
cp .env.example .env
```

### Prisma

- Install and run PostgreSQL. [docs/postgresql/install](/docs/postgresql/install.md)
- Create Database for this project. [docs/postgresql/create_database](/docs/postgresql/create_database.md)
- Edit `DATABASE_URL` in `.env`

```sh
npx prisma migrate dev
npx prisma studio
```

Reset migration and seed data

```sh
npx prisma migrate reset
```

## Start server

```sh
npm run dev
```

## Credits
- obrkn
-geoayalamung
-orange-na
-YosefthGuaca
