import React from 'react';
import {BrowserRouter, Route, Routes } from 'react-router-dom';

import InicioUsuario from './components/Usuario/InicioUsuario';
import Home from './components/PagInicio/Home';

import './App.css'
<<<<<<< HEAD
import AdminLayout from './components/Administrador/AdminLayout/AdminLayout';
=======
import DashboardAdmin from './components/Administrador/Dashboard/DashboardAdmin';
import HistorialUsuario from './components/Usuario/Historial_Notificaciones/HistorialUsuario';
import IniciarSesion from './components/PagInicio/Header/IniciarSesion/IniciarSesion'
import Registrar from './components/PagInicio/Header/Registrar/Registrar';
>>>>>>> 548d79199d88ea1819e2fd0b3e86a1a72ee6b182

function App() {
  return (
    <BrowserRouter>
    <div>
      <Routes>

          <Route path="/" element={<Home/>} />
<<<<<<< HEAD
=======
          <Route path="/IniciarSesion" element={<IniciarSesion/>} />
          <Route path="/Registrar" element={<Registrar/>} />
          
          <Route path="/Administrador/prestamos" element={<PrestamosAdministrador/>} />
          <Route path="/Administrador/solicitudes" element={<Solicitudes/>} />
          <Route path="/Administrador/dashboard" element={<DashboardAdmin/>} />
          
          <Route path="/usuario/historial" element={<HistorialUsuario/>} />
>>>>>>> 548d79199d88ea1819e2fd0b3e86a1a72ee6b182

          <Route path="/usuario/*" element={<InicioUsuario id='1'/>} />
          <Route path="/administrador/*" element={<AdminLayout/>} />

        </Routes>
    </div>
    </BrowserRouter>
        
  );
}

export default App
