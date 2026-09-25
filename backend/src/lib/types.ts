import z from 'zod'
export const cartSchema = z.object({
  items: z
    .array(
      z.object({
        productId: z.string().uuid(),
        quantity: z.number().int().positive()
      })
    )
    .min(1)
})

export const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.coerce.number().default(3001),
  DATABASE_URL: z.string().min(1),

  CLERK_PUBLISHABLE_KEY: z.string().min(1),
  CLERK_SECRET_KEY: z.string().min(1),
  CLERK_WEBHOOK_SECRET: z.string().min(1),

  FRONTEND_URL: z.string().url(),

  POLAR_ACCESS_TOKEN: z.string().optional(),
  POLAR_WEBHOOK_SECRET: z.string().optional(),
  POLAR_API_BASE: z.string().url().default('https://api.polar.sh'),
  POLAR_CHEKOUT_PRODUCT_ID: z.string().uuid(),

  STREAM_API_KEY: z.string().min(1),
  STREAM_API_SECRET: z.string().min(1),

  IMAGEKIT_PUBLIC_KEY: z.string().min(1),
  IMAGEKIT_PRIVATE_KEY: z.string().min(1),
  IMAGEKIT_URL_ENDPOINT: z.string().url(),

  SENTRY_DSN: z.string().url().optional()
})

export type CheckoutCreateBody = {
  products: string[]
  prices?: Record<
    string,
    Array<{
      amount_type: 'fixed'
      price_amount: number
      price_currency: string
    }>
  >
  success_url: string
  return_url?: string
  external_customer_id?: string
  customer_email?: string
  metadata: Record<string, string | number | boolean>
}

export const productsSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  category: z.string().min(1).default('General'),
  description: z.string().default(''),
  priceCents: z.number().int().positive(),
  currency: z.string().min(1).default('usd'),
  imageUrl: z
    .union([z.string().url(), z.literal('')])
    .optional()
    .nullable(),
  imageKitFieldId: z
    .union([z.string().min(1), z.literal(''), z.null()])
    .optional(),
  active: z.boolean().default(true)
})

export const productUpdate = productsSchema.partial()
