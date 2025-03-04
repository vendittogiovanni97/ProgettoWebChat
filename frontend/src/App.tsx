import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import './App.css'
import { LoginPages } from './pages/auth/login.pages'
import { RegisterPages } from './pages/auth/register.pages'

function App() {
  return (
    <>
    <BrowserRouter> 
    <Routes>
          <Route path="/login" element={<LoginPages/>} />
          <Route path="/register" element={<RegisterPages />} />
          {/* Reindirizza alla pagina di login se la route non è specificata */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          {/* Altre route della tua applicazione... */}
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
