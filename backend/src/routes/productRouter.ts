import { Router } from 'express'
import { getCategories, getProductBySlug, listProducts } from '../controllers/productControllers'

const router = Router()

router.get("/",listProducts)
router.get("/categories",getCategories)
router.get("/:slug",getProductBySlug)


export default router
