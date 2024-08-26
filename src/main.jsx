import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '././components/App/App.jsx'
import './index.css'
import Header from '././components/Header/Header.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header />
    <App />
  </StrictMode>,
)
