import Footer from './Footer'
import NavBar from './NavBar'

const Layout = ({ children }) => {
  return (
    <div className='flex flex-col min-h-screen bg-base-100 text-base-content antialiased'>
      <NavBar />

      <main className='grow container mx-auto px-4 py-8 md:px-6 md:py-12 max-w-7xl'>
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
