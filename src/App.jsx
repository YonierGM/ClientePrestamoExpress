import React from 'react';
import {BrowserRouter, Route, Routes } from 'react-router-dom';

import InicioUsuario from './components/Usuario/InicioUsuario';
import Home from './components/PagInicio/Home';
import PrestamosAdministrador from './components/Administrador/PrestamosAdmin/PrestamosAdministrador';
import Solicitudes from './components/Administrador/Solicitudes/Solicitudes';

import './App.css'
import DashboardAdmin from './components/Administrador/Dashboard/DashboardAdmin';
import HistorialUsuario from './components/Usuario/Historial_Notificaciones/HistorialUsuario';
import IniciarSesion from './components/PagInicio/Header/IniciarSesion/IniciarSesion'
import Registrar from './components/PagInicio/Header/Registrar/Registrar';

function App() {
  return (
    <BrowserRouter>
    <div>
      <Routes>

          <Route path="/" element={<Home/>} />
          <Route path="/IniciarSesion" element={<IniciarSesion/>} />
          <Route path="/Registrar" element={<Registrar/>} />
          
          <Route path="/Administrador/prestamos" element={<PrestamosAdministrador/>} />
          <Route path="/Administrador/solicitudes" element={<Solicitudes/>} />
          <Route path="/Administrador/dashboard" element={<DashboardAdmin/>} />
          
          <Route path="/usuario/historial" element={<HistorialUsuario/>} />

          <Route path="/usuario/*" element={<InicioUsuario id='1'/>} />
          <Route path="/administrador/*" element={<PrestamosAdministrador/>} />

        </Routes>
    </div>
    </BrowserRouter>
        
  );
}

export default App
