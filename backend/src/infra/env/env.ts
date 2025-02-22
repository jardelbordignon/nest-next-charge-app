import { z } from 'zod'

export const envSchema = z.object({
  ASAAS_API_KEY: z.string().min(1),
  DATABASE_URL: z.string().min(1),
  NODE_ENV: z
    .enum(['development', 'test', 'homolog', 'production'])
    .default('development'),
  JWT_ACCESS_EXPIRES_IN: z.string().default('7 days'),
  JWT_SECRET_KEY: z.string(),
  PORT: z.coerce.number().default(4000),
})

export type Env = z.infer<typeof envSchema>
