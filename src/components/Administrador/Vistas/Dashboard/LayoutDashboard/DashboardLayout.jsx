// DashboardLayout.js
import React from "react";
import "./DashboardLayout.css";
import { Routes, Route } from "react-router-dom";
import MenuDashboard from "../../../Compartidos/MenuDashboard/MenuDashboard";

import ListarPrestamos from "../Prestamos/ListarPrestamos/ListarPrestamos";
import FormularioPrestamos from "../Prestamos/FormularioPrestamos/FormularioPrestamos";

import FormularioClientes from "../Clientes/FormularioClientes/FormularioClientes";
import ListarClientes from "../Clientes/ListarClientes/ListarClientes";
import ListarUsuarios from "../Usuarios/ListarUsuarios/ListarUsuarios";
import FormularioUsuarios from "../Usuarios/FormularioUsuarios/FormularioUsuarios";

export const DashboardLayout = () => {
  return (
    <div className="DashboardContent">
      <div className="headerDashboard">
        <MenuDashboard />
      </div>
      <div className="headerDashboard-main">
        <div className="ContentMain">
          <Routes>
            <Route path="/prestamos" element={<ListarPrestamos />}/>
            <Route path="/prestamos/editar/:prestamoId" element={<FormularioPrestamos />} />
            <Route path="/prestamos/crear" element={<FormularioPrestamos />} />

            <Route path="/clientes" element={<ListarClientes />}/>
            <Route path="/clientes/editar/:clienteId" element={<FormularioClientes />} />
            <Route path="/clientes/crear" element={<FormularioClientes />} />

            <Route path="/usuarios" element={<ListarUsuarios />}/>
            <Route path="/usuarios/editar/:usuarioId" element={<FormularioUsuarios />} />
            <Route path="/usuarios/crear" element={<FormularioUsuarios />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
