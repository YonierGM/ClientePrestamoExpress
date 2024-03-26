import React from "react";
import "./MenuDashboard.css";

import {Link} from 'react-router-dom';

export const MenuDashboard = () => {
  return (
    <div className="HeaderDashboard">
      <nav className="navDashboard">
        <ul  className="ulDashboard"> 
          <li className="liDashboard">
            <Link className="enlaceDashboard" to="/administrador/dashboard/prestamos">Prestamos</Link>
            <Link className="enlaceDashboard" to="/administrador/dashboard/clientes">Clientes</Link>
            <Link className="enlaceDashboard" to="/administrador/dashboard/usuarios">Usuarios</Link>
            </li>
        </ul>
      </nav>
    </div>
  );
};

export default MenuDashboard;
