import PageLoader from './components/PageLoader'
import { useAuth } from '@clerk/react'
import Layout from './components/Layout'
import { Routes, Route } from 'react-router'
import HomePage from './pages/HomePage'

function App () {
  const { isLoaded } = useAuth()
  if (!isLoaded) return <PageLoader />
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<HomePage />} />
      </Routes>
    </Layout>
  )
}

export default App
