import React from "react";
import './MenuLateralAdmin.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGauge, faFile, faFileInvoice, faCircleUser, faBell, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'

export const MenuLateralAdmin = () =>
{
    return(
        <section className="menuLateral">
            <nav className="navbar">
                <div className="navbarTitulo">
                    <h1>PrestamoExpress</h1>
                </div>
                <ul>
                    <li><FontAwesomeIcon className="icon" icon={faGauge} /><a>Dashboard</a></li>
                    <li><FontAwesomeIcon className="icon" icon={faFile} /><a>Prestamos</a></li>
                    <li><FontAwesomeIcon className="icon" icon={faFileInvoice} /><a>Solicitudes</a></li>
                    <li><FontAwesomeIcon className="icon" icon={faCircleUser} /><a>Admin</a></li>
                    {/* <li><FontAwesomeIcon className="icon" icon={faBell} /><a>Notificaciones</a></li> */}
                    <li><FontAwesomeIcon className="icon" icon={faRightFromBracket} /><a>Logout</a></li>
                </ul>
            </nav>
        </section>
    ) 
};

export default MenuLateralAdmin;
