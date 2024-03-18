import React from "react";
import './css/BarraLateral.css'
import { Link } from "react-router-dom";
import imgSolicitud from './img/dinero.png'
import imgProducto from './img/Productos.png'
import imgHistorial from './img/reloj.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from "bootstrap";

const BarraLateral = (Props) =>
{
    return (<>
    <div className="d-flex flex-column justify-content-center align-items-center h-75">
        <Link to='/usuario/solicitudprestamo' className="text-light selecccionBarra btn"> 
                <img src={imgSolicitud} className="imgUsuario" /> Solicitud de Prestamo 
        </Link >
        <Link to = "/usuario/productos"className="text-light selecccionBarra btn">
                <img src={imgProducto} className="imgUsuario" /> Productos
        </Link>
        <Link to = '/usuario/historialPrestamos' className="text-light selecccionBarra btn" >
                <img src={imgHistorial} className="imgUsuario" /> Historial
        </Link>
   </div>
    </>
    
   )
};

export default BarraLateral