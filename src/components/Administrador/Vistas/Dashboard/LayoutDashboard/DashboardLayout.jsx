import React from "react";
import "./DashboardLayout.css";
import { Route, Routes, Outlet } from "react-router-dom";
import MenuDashboard from "../../../Compartidos/MenuDashboard/MenuDashboard";
import ListarPrestamos from "../Prestamos/ListarPrestamos/ListarPrestamos";
import FormularioPrestamos from "../Prestamos/FormularioPrestamos/FormularioPrestamos";

export const DashboardLayout = () => {
  return (
    <div className="DashboardContent">
      <div className="headerDashboard">
        <MenuDashboard />
      </div>
      <div className="headerDashboard-main">
        <div className="ContentMain">
          {/* Utiliza Outlet para renderizar las rutas secundarias */}
          <Routes>
            {/* Ruta para mostrar la lista de préstamos */}
            <Route path="/prestamos/*" element={<ListarPrestamos />} />
            {/* Utiliza Outlet para renderizar las rutas secundarias */}
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
