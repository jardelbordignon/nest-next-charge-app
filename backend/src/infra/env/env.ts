import { z } from 'zod'

export const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'homolog', 'production'])
    .default('development'),
  PORT: z.coerce.number().default(4000),
})

export type Env = z.infer<typeof envSchema>
