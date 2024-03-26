import React from 'react';
import {BrowserRouter, Route, Routes } from 'react-router-dom';

import InicioUsuario from './components/Usuario/InicioUsuario';
import Home from './components/PagInicio/Home';
import './App.css'
import AdminLayout from './components/Administrador/AdminLayout/AdminLayout';
import IniciarSesion from './components/PagInicio/Header/IniciarSesion/IniciarSesion';
import Registrar from './components/PagInicio/Header/Registrar/Registrar';

function App() {
  return (
    <BrowserRouter>
    <div>
      <Routes>
          <Route path="/" element={<Home/>} />
          <Route path='/IniciarSesion' element={<IniciarSesion/>}></Route> 
          <Route path='/Registrar' element={<Registrar/>}></Route> 
          <Route path="/usuario/:usuarioid/*" element={<InicioUsuario />} />
          <Route path="/administrador/*" element={<AdminLayout/>} />
        </Routes>
    </div>
    </BrowserRouter>
        
  );
}

export default App
