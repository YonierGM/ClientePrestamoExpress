import {BrowserRouter, Route, Routes } from 'react-router-dom';

import InicioUsuario from './components/Usuario/InicioUsuario';
import Home from './components/PagInicio/Home';
import InicioAdministrador from './components/Administrador/InicioUsuario';

import './App.css'

function App() {
  return (
    <BrowserRouter>
    <div>
      <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/usuario/*" element={<InicioUsuario/>} />
          <Route path="/Administrador/*" element={<InicioAdministrador/>} />
        </Routes>
    </div>
    </BrowserRouter>
        
  );
}

export default App
