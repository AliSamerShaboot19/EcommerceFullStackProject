import { Router } from 'express'
import {
  createAdminProducts,
  deleteAdminProduct,
  getImageKitAuth,
  listAdminProducts,
  requireAdmin,
  updateAdminProduct
} from '../controllers/adminControllers'

const router = Router()

router.use(requireAdmin)
router.get('/imagekit/auth', getImageKitAuth)
router.get('/products', listAdminProducts)
router.post('/products', createAdminProducts)
router.patch('/products/:id', updateAdminProduct)
router.patch('/products/:id', deleteAdminProduct)


export default router
