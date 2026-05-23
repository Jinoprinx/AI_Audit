# Stage 1: Build the application
FROM node:18-alpine AS builder

RUN apk add --no-cache libc6-compat openssl

WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy source code and Prisma schema
COPY . .

# Ensure public directory exists (prevents COPY failure if it's missing)
RUN mkdir -p /app/public

# Generate Prisma client
RUN npx prisma generate

# Dummy environment variables for build time
ENV DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy"
ENV DIRECT_URL="postgresql://dummy:dummy@localhost:5432/dummy"
ENV BREVO_API_KEY="dummy"
ENV BREVO_SMTP_LOGIN="dummy@dummy.com"
ENV OPENAI_API_KEY="dummy"
ENV NEXTAUTH_SECRET="dummy"
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# Stage 2: Run the application
FROM node:18-alpine AS runner

RUN apk add --no-cache libc6-compat openssl

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create a non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Ensure correct permissions
USER nextjs

EXPOSE 3000

ENV PORT=3000
# set hostname to localhost
ENV HOSTNAME="0.0.0.0"

# Run the application
CMD ["node", "server.js"]
