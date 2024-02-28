_Program Project Kickoff_ document has been moved. [docs/kick_off](/docs/kick_off/README.md)

# Ux Show Go

![Ux Show Go](/docs/logos/rectangle.png)

## Set up

```sh
npm run setup
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

## Start server

```sh
npm run dev
```
