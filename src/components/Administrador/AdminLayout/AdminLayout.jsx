import React from "react";
import "./AdminLayout.css";

import { Routes, Route, NavLink } from "react-router-dom";

import MenuLateralAdmin from "../Compartidos/MenuLateralAdmin/MenuLateralAdmin";

import PrestamosAdministrador from "../Vistas/PrestamosAdmin/PrestamosAdministrador";
import DashboardAdmin from "../Vistas/Dashboard/DashboardAdmin";
import Solicitudes from "../Vistas/Solicitudes/Solicitudes";
import DatosAdmin from "../Vistas/DatosAdmmin/DatosAdmin";
import DashboardLayout from "../Vistas/Dashboard/LayoutDashboard/DashboardLayout";
import FormularioPrestamos from "../Vistas/Dashboard/Prestamos/FormularioPrestamos/FormularioPrestamos";

export const AdminLayout = () => {
  return (
    <div className="contentLayout">
      <div className="menu">
        <MenuLateralAdmin />
      </div>
      <div className="component">
        <Routes>
          <Route path="/solicitudes" element={<Solicitudes />} />
          <Route path="/prestamos" element={<PrestamosAdministrador />} />
          <Route path="/dashboard/*" element={<DashboardLayout />} />
          <Route path="/perfil" element={<DatosAdmin />} />
        </Routes>
        <div className="svg">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#2134A0"
              fillOpacity="1"
              d="M0,64L48,85.3C96,107,192,149,288,160C384,171,480,149,576,154.7C672,160,768,192,864,208C960,224,1056,224,1152,186.7C1248,149,1344,75,1392,37.3L1440,0L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
