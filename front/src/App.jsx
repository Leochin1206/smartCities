import { Routes, Route } from 'react-router-dom'

import { Login } from './pages/login'
import { Cadastro } from './pages/cadastro'

import { Contador } from './pages/contador'
import { Home } from './pages/home'
import { Luminosidade } from './pages/luminosidade'
import { Temperatura } from './pages/temperatura'
import { Umidade } from './pages/umidade'

import './App.css'

export default function App() {
  return (
    <Routes>
       <Route path="/contador" element={<Contador />} />
       <Route path="/home" element={<Home />} />
       <Route path="/luminosidade" element={<Luminosidade />} />
       <Route path="/temperatura" element={<Temperatura />} />
       <Route path="/umidade" element={<Umidade />} />

       <Route path="/" element={<Login />} />
       <Route path="/cadastro" element={<Cadastro />} />
    </Routes>
  )
}


