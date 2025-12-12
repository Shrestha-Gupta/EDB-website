# EDB Backend

Backend API for the EDB application.

## Project Structure

```
backend/
├── src/
│   ├── controllers/     # Request handlers
│   ├── routes/          # API routes
│   ├── models/          # Data models
│   ├── middleware/      # Express middleware
│   ├── utils/           # Utility functions
│   └── server.ts        # Entry point
├── config/              # Configuration files
├── tests/               # Test files
├── package.json
├── tsconfig.json
└── .env.example
```

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create `.env` file from `.env.example`:

   ```bash
   cp .env.example .env
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

## Available Scripts

- `npm run dev` - Run development server with ts-node
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run compiled JavaScript
- `npm test` - Run tests with Jest
