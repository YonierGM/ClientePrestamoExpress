import React from 'react';
import {BrowserRouter, Route, Routes } from 'react-router-dom';

import InicioUsuario from './components/Usuario/InicioUsuario';
import Home from './components/PagInicio/Home';
import Login from './components/Usuario/Login'
import './App.css'
import AdminLayout from './components/Administrador/AdminLayout/AdminLayout';
import IniciarSesion from './components/PagInicio/Header/IniciarSesion/IniciarSesion';

function App() {
  return (
    <BrowserRouter>
    <div>
      <Routes>
          <Route path="/" element={<Home/>} />
          <Route path='/IniciarSesion' element={<IniciarSesion/>}></Route>
          <Route path="/usuario/*" element={<InicioUsuario id='1'/>} />
          <Route path="/administrador/*" element={<AdminLayout/>} />
        </Routes>
    </div>
    </BrowserRouter>
        
  );
}

export default App
