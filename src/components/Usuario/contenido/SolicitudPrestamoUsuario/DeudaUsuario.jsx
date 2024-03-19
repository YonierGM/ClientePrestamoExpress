import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
const Deudausuario = () =>
{
    return(
    <div className="d-flex flex-column d-flex justify-content-center">
        <h1 className="text-center border border-info bg-info rounded-pill">Upss! lo sentimos</h1><br/> 
        <h5>Ya has superado el tope de prestamos <br />
        puedes ir a pagarlo precionando el boton</h5>
        <Link to = "/usuario/pagoprestamo" className="btn btn-primary w-50"> Ir a pagar</Link> 
    </div>
        
    )
}

export default Deudausuario