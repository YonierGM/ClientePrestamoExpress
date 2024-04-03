import React from "react";
import "./MenuLateralAdmin.css";
import {Link} from 'react-router-dom';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGauge,
  faFile,
  faFileInvoice,
  faCircleUser,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

export const MenuLateralAdmin = () => {
  return (
    <section className="menuLateral">
      <nav className="navbar">
        <div className="navbarTitulo">
          <h1>PrestamoExpress</h1>
        </div>
        <ul>
          <li>
            <FontAwesomeIcon className="icon" icon={faGauge} />
            <Link to="/administrador/dashboard/prestamos">Dashboard</Link>
          </li>
          <li>
            <FontAwesomeIcon className="icon" icon={faFile} />
            <Link to="/administrador/resumen">Resumen</Link>
          </li>
          <li>
            <FontAwesomeIcon className="icon" icon={faFileInvoice} />
            <Link to="/administrador/solicitudes">Solicitudes</Link>
          </li>
          <li>
            <FontAwesomeIcon className="icon" icon={faCircleUser} />
            <Link to="/administrador/perfil">Admin</Link>
          </li>
          {/* <li><FontAwesomeIcon className="icon" icon={faBell} /><a>Notificaciones</a></li> */}
          <li>
            <FontAwesomeIcon className="icon" icon={faRightFromBracket} />
            <Link to="/IniciarSesion">Logout</Link>
          </li>
        </ul>
      </nav>
    
    </section>
  );
};

export default MenuLateralAdmin;
