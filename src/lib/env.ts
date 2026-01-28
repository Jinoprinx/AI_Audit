import { z } from 'zod';

const envSchema = z.object({
    DATABASE_URL: z.string().url(),
    DIRECT_URL: z.string().url(),
    BREVO_API_KEY: z.string().min(1),
    BREVO_SMTP_LOGIN: z.string().email(), // Brevo SMTP Login Requirement
    NEXTAUTH_SECRET: z.string().min(1),
    NEXTAUTH_URL: z.string().url().optional(), // Can be optional in Vercel as it is automatically detected, but better to validate if provided
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
    console.error('❌ Invalid environment variables:', result.error.flatten().fieldErrors);
    throw new Error('Invalid environment variables');
}

export const env = result.data;
