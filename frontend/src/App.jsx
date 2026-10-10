import PageLoader from './components/PageLoader'
import { useAuth } from '@clerk/react'
import Layout from './components/Layout'
import { Routes, Route } from 'react-router'
import HomePage from './pages/HomePage'
import CartPages from './pages/CartPages'

function App () {
  const { isLoaded } = useAuth()
  if (!isLoaded) return <PageLoader />
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/cart' element={<CartPages />} />
      </Routes>
    </Layout>
  )
}

export default App
