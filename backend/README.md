## Setup

```bash
npm install
cp .env.example .env
```

### Prisma

- Install PostgreSQL
- Create Database
- Set DATABASE_URL in `.env`

```bash
npx prisma migrate dev --name init
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
