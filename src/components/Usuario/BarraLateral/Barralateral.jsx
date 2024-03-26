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
        let urlusuarioPrestamo = '/usuario/'+Props.id+'/solicitudprestamo'
        let urlpagoPrestamos = '/usuario/'+Props.id+'/pagoprestamo'
        let urlhitorialusuario = '/usuario/'+Props.id+'/historialPrestamos'
    return (<>
    <div className="d-flex flex-column justify-content-center align-items-center h-75">
        <Link to={urlusuarioPrestamo} className="text-light selecccionBarra btn d-flex "> 
                <img src={imgSolicitud} className="imgUsuario" /> <p className="mt-2">Solicitud de Prestamo </p> 
        </Link >
        <Link to = {urlpagoPrestamos}className="text-light selecccionBarra btn d-flex">
                <img src={imgProducto} className="imgUsuario" /> <p className="mt-2">Forma de pago</p>
        </Link>
        <Link to = {urlhitorialusuario} className="text-light selecccionBarra btn d-flex" >
                <img src={imgHistorial} className="imgUsuario" /> <p className="mt-2">Historial</p>
        </Link>
   </div>
    </>
    
   )
};

export default BarraLateral