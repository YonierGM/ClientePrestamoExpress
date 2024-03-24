import {BrowserRouter, Route, Routes } from 'react-router-dom';

import InicioUsuario from './components/Usuario/InicioUsuario';
import Home from './components/PagInicio/Home';

import './App.css'
import AdminLayout from './components/Administrador/AdminLayout/AdminLayout';

function App() {
  return (
    <BrowserRouter>
    <div>
      <Routes>
          <Route path="/" element={<Home/>} />

          <Route path="/usuario/*" element={<InicioUsuario id='1'/>} />
          <Route path="/administrador/*" element={<AdminLayout/>} />

        </Routes>
    </div>
    </BrowserRouter>
        
  );
}

export default App
