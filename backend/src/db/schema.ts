import {
  pgTable,
  text,
  integer,
  timestamp,
  uuid,
  jsonb,
  boolean
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

export type OrderStatus = 'pending' | 'paid' | 'failed'
export type UserRole = 'customer' | 'support' | 'admin'

export type CheckoutLine = {
  productId: string
  quantity: number
  unitPriceCents: number
}

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  clerkUserId: text('clerk_user_id').notNull().unique(),
  displayName: text('display_name').notNull(),
  email: text('email').notNull().unique(),
  role: text('role').$type<UserRole>().notNull().default('customer'),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow()
})

export const products = pgTable('products', {
  id: uuid('id').primaryKey().defaultRandom(),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  category: text('category').notNull().default('General'),
  description: text('description').notNull(),
  price: integer('price').notNull(),
  currency: text('currency').notNull().default('USD'),
  imageUrl: text('image_url'),
  imageKitField: text('image_kit_field_id'),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow()
})

export const checkoutSessions = pgTable('checkout_sessions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  polarCheckoutId: text('polar_checkout_id').unique(),
  lines: jsonb('lines').$type<CheckoutLine[]>().notNull(),
  totalCents: integer('total_cents').notNull(),
  currency: text('currency').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow()
})

export const orders = pgTable('orders', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  status: text('status').$type<OrderStatus>().notNull().default('pending'),
  polarCheckoutId: text('polar_checkout_id'),
  polarOrderId: text('polar_order_id').unique(),
  totalCents: integer('total_cents').notNull().default(0),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow()
})

export const orderItems = pgTable('order_items', {
  id: uuid('id').defaultRandom().primaryKey(),
  orderId: uuid('order_id')
    .notNull()
    .references(() => orders.id, { onDelete: 'cascade' }),
  productId: uuid('product_id')
    .notNull()
    .references(() => products.id, { onDelete: 'cascade' }),
  quantity: integer('quantity').notNull(),
  unitPriceCents: integer('unit_price_cents').notNull()
})

export const usersRelations = relations(users, ({ many }) => ({
  orders: many(orders)
}))

export const productsRelations = relations(products, ({ many }) => ({
  orderItems: many(orderItems)
}))

export const ordersRelations = relations(orders, ({ many, one }) => ({
  user: one(users, { fields: [orders.userId], references: [users.id] }),
  items: many(orderItems)
}))

export const ordersItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, { fields: [orderItems.orderId], references: [orders.id] }),
  product: one(products, {
    fields: [orderItems.productId],
    references: [products.id]
  })
}))

