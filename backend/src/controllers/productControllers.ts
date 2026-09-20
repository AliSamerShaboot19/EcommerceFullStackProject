import type { NextFunction, Request, Response } from 'express'
import { db } from '../db'
import { products } from '../db/schema'
import { and, desc, eq } from 'drizzle-orm'

export async function listProducts (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const cat =
      typeof req.query.category === 'string' ? req.query.category.trim() : ''

    const activeOnly = eq(products.active, true)
    const categorieswhere = eq(products.category, cat)
    const whereClause = cat ? and(activeOnly, categorieswhere) : activeOnly

    const raws = await db
      .select()
      .from(products)
      .where(whereClause)
      .orderBy(desc(products.createdAt))

    res.json({ products: raws })
  } catch (error) {
    next(error)
  }
}

export async function getCategories (
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const raws = await db
      .select({ category: products.category })
      .from(products)
      .where(eq(products.active, true))

    const categories = [...new Set(raws.map(r => r.category))].sort((a, b) =>
      a.localeCompare(b)
    )

    res.json(categories)
  } catch (error) {
    next(error)
  }
}

export async function getProductBySlug (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const [row] = await db
      .select()
      .from(products)
      .where(eq(products.slug, req.params.slug as string))
      .limit(1)

    if (!row || !row.active)
      return res.status(404).json({ error: 'Not found.' })

    res.json({ product: row })
  } catch (error) {
    next(error)
  }
}

