import { z } from 'zod';

const envSchema = z.object({
    DATABASE_URL: z.string().url(),
    DIRECT_URL: z.string().url(),
    BREVO_API_KEY: z.string().min(1),
    BREVO_SMTP_LOGIN: z.string().email(),
    OPENAI_API_KEY: z.string().min(1),
    NEXTAUTH_SECRET: z.string().min(1),
    NEXT_PUBLIC_BASE_URL: z.string().url().optional(),
    NEXTAUTH_URL: z.string().url().optional(),
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
    console.error('❌ Invalid environment variables:', result.error.flatten().fieldErrors);
    throw new Error('Invalid environment variables');
}

export const env = result.data;
