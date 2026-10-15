import PageLoader from './components/PageLoader'
import { useAuth } from '@clerk/react'
import Layout from './components/Layout'
import { Routes, Route, Navigate } from 'react-router'
import HomePage from './pages/HomePage'
import CartPages from './pages/CartPages'
import OrdersPage from './pages/OrdersPage'
import CheckoutReturnPage from './pages/CheckoutReturnPage'

function App () {
  const { isLoaded, isSignedIn } = useAuth()
  if (!isLoaded) return <PageLoader />
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/cart' element={<CartPages />} />
        <Route
          path='/orders'
          element={isSignedIn ? <OrdersPage /> : <Navigate to={'/'} replace />}
        />
        <Route path='/checkout/return' element={<CheckoutReturnPage />} />
      </Routes>
    </Layout>
  )
}

export default App
