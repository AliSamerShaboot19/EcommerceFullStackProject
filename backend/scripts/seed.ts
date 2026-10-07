import 'dotenv/config'
import { drizzle } from 'drizzle-orm/node-postgres'
import pg from 'pg'
import { products } from '../src/db/schema'

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL })
const db = drizzle(pool)

const CATALOG = [
  {
    slug: 'quantum-wireless-headphones',
    name: 'Quantum Noise-Canceling Headphones',
    category: 'Electronics',
    description:
      'Experience pure sound with hybrid active noise cancellation, 40-hour battery life, and ultra-comfortable memory foam earcups.',
    priceCents: 14999,
    imageUrl: 'https://unsplash.com'
  },
  {
    slug: 'minimalist-leather-wallet',
    name: 'Minimalist Full-Grain Leather Wallet',
    category: 'Accessories',
    description:
      'Handcrafted slim wallet featuring RFID blocking technology and quick-access slots for up to 8 cards and cash.',
    priceCents: 4500,
    imageUrl: 'https://unsplash.com'
  },
  {
    slug: 'ergonomic-mechanical-keyboard',
    name: 'AeroTouch Mechanical Keyboard',
    category: 'Electronics',
    description:
      'Wireless mechanical keyboard with hot-swappable quiet linear switches, dynamic RGB backlighting, and aluminum frame.',
    priceCents: 12900,
    imageUrl: 'https://unsplash.com'
  },
  {
    slug: 'hydro-smart-water-bottle',
    name: 'HydroGlow Smart Water Bottle',
    category: 'Fitness',
    description:
      'Stainless steel insulated bottle that tracks your daily hydration goals and sanitizes itself using built-in UV-C light.',
    priceCents: 5999,
    imageUrl: 'https://unsplash.com'
  },
  {
    slug: 'urban-explorer-backpack',
    name: 'Urban Explorer Waterproof Backpack',
    category: 'Accessories',
    description:
      'Weatherproof roll-top backpack with a dedicated 16-inch laptop compartment and hidden anti-theft pockets for travel.',
    priceCents: 8950,
    imageUrl: 'https://unsplash.com'
  },
  {
    slug: 'aura-essential-oil-diffuser',
    name: 'Aura Ceramic Ultrasonic Diffuser',
    category: 'Home Decor',
    description:
      'Elegant ceramic oil diffuser featuring 7 ambient LED colors and automatic shut-off to create a calming home atmosphere.',
    priceCents: 3999,
    imageUrl: 'https://unsplash.com'
  },
  {
    slug: 'pro-focus-webcam-4k',
    name: 'ProFocus 4K Ultra HD Webcam',
    category: 'Electronics',
    description:
      'Crystal clear 4K video resolution for streaming and meetings, featuring dual noise-reducing microphones and auto-framing.',
    priceCents: 9900,
    imageUrl: 'https://unsplash.com'
  },
  {
    slug: 'luxe-soy-scented-candle',
    name: 'Midnight Oak Luxury Soy Candle',
    category: 'Home Decor',
    description:
      'Premium hand-poured soy wax candle with a crackling wooden wick, offering a warm blend of oakwood, amber, and spice notes.',
    priceCents: 2400,
    imageUrl: 'https://unsplash.com'
  },
  {
    slug: 'universal-placeholder-item',
    name: 'Premium Eco-Friendly Water Flask',
    category: 'Fitness',
    description:
      'A durable, double-walled vacuum insulated flask designed to keep your drinks cold for 24 hours or hot for 12 hours.',
    priceCents: 2999,
    imageUrl: 'default-image.jpg'
  },
  {
    slug: 'placeholder-item',
    name: ' Eco-Friendly Water Flask',
    category: 'Fitness',
    description:
      'A durable, double-walled vacuum insulated flask designed to keep your drinks cold for 24 hours or hot for 12 hours.',
    priceCents: 2999,
    imageUrl: 'https://ik.imagekit.io/satcdtbcb/default-image.jpg'
  }
]

async function main () {
  const row = CATALOG.map(p => ({
    slug: p.slug,
    name: p.name,
    category: p.category,
    description: p.description,
    price: p.priceCents,
    currency: 'usd',
    imageUrl: p.imageUrl,
    active: true
  }))

  for (const r of row) {
    await db
      .insert(products)
      .values(r)
      .onConflictDoUpdate({
        target: products.slug,
        set: {
          name: r.name,
          category: r.category,
          description: r.description,
          price: r.price,
          imageUrl: r.imageUrl,
          active: r.active
        }
      })
  }
  console.log(
    `🚀 Seed completed: ${CATALOG.length} products upserted successfully!`
  )
}

main()
  .catch(err => {
    console.error('❌ Error during seeding:', err)
    process.exit(1)
  })
  .finally(async () => {
    await pool.end()
  })
