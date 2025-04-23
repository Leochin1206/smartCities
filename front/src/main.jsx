import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import { Navbar } from './components/Navbar.jsx'
import App from './App.jsx'
import { Footer } from './components/footer.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <div className="min-h-screen flex flex-col sm:flex-row">
        
        <div className="fixed sm:static w-full sm:w-[200px] h-[64px] sm:h-auto z-50">
          <Navbar />
        </div>

        <div className="!pt-[64px] sm:!pt-0 flex-grow">
          <main className="min-h-screen">
            <App />
          </main>
          <Footer />
        </div>

      </div>
    </BrowserRouter>
  </StrictMode>
)
