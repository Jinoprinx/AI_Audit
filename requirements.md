# Project Requirements & Environment Configuration

This document outlines the necessary dependencies and environment variables required to run the AI-Audit Platform at 100% functionality.

## 1. Technical Prerequisites

- **Node.js**: v18.17.0 or higher (Recommended: v20 LTS)
- **Package Manager**: `npm` (v10+), `yarn` (v1.22+), or `pnpm` (v8+)
- **Database**: PostgreSQL (v14+)
- **Email Service**: Brevo (formerly Sendinblue) account for transactional emails.

## 2. Environment Variables

Create a `.env` file in the root directory and populate it with the following keys:

| Variable | Description | Example / Format |
| :------- | :---------- | :--------------- |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:password@localhost:5432/ai_audit` |
| `BREVO_API_KEY` | Transactional Email API Key | `xkeysib-xxxxxxxxxxxxxx` |
| `NEXT_PUBLIC_BASE_URL` | Base URL of the application | `http://localhost:3000` |
| `NODE_ENV` | Current environment | `development` or `production` |

## 3. Database Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Initialize Prisma Client**:
   ```bash
   npx prisma generate
   ```

3. **Run Database Migrations**:
   ```bash
   npx prisma db push
   ```
   *(Note: Use `db push` for initial prototypes or `migrate dev` for production-grade schema management.)*

## 4. External Services Configuration

### A. PostgreSQL Setup (Database)
We recommend using [Neon](https://neon.tech/) or [Supabase](https://supabase.com/) for a managed PostgreSQL database.

**Step-by-Step (Neon Example):**
1. Sign up/Login at [Neon.tech](https://neon.tech/).
2. Create a new project named `ai-audit`.
3. In the **Connection Details** widget on the Dashboard, select **Prisma** from the dropdown.
4. Copy the connection string (it looks like `postgresql://user:password@hostname/dbname?sslmode=require`).
5. Paste this directly into your `.env` file as `DATABASE_URL`.

### B. Brevo Setup (Transactional Email)
To enable automated audit reporting via email:

**Step-by-Step:**
1. Log in to your [Brevo account](https://app.brevo.com/).
2. Click on your **Account Name** (top right) > **SMTP & API**.
3. Under the **API Keys** tab, click **+ Generate a new API key**.
4. Give it a name (e.g., `AI-Audit-Tool-Key`) and click **Generate**.
5. **Copy the key immediately** (you won't see it again).
6. Paste the key into your `.env` file as `BREVO_API_KEY`.
7. **Verification**: Go to **Transactional** > **Settings** > **Sender Management** and ensure you have a verified sender email that matches the one in `src/lib/brevo.ts` (currently `noreply@aiaudit.com`).

## 5. Development Server

Start the development server with:
```bash
npm run dev
```

The application will be accessible at [http://localhost:3000](http://localhost:3000).
