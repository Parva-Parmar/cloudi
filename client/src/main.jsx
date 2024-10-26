import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Login from './components/login.jsx'
import Existing from './components/existing.jsx'
import { BrowserRouter , Routes ,Route } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login/>} exact/>
      <Route path="/" element={<Existing/>} exact/>
      <Route path="/app" element={<App/>} exact/>
    </Routes>
</BrowserRouter>,
)
