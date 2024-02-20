## Setup

```bash
npm install
cp .env.example .env
```

### Prisma

- Install and run PostgreSQL
- Create Database for this project
- Set `DATABASE_URL` in `.env`

```bash
npx prisma migrate dev
npx prisma studio
```

## Start

```bash
npm run dev
```

## Build

```bash
npm run build
npm run start
```

## Test

```bash
npm test
```
