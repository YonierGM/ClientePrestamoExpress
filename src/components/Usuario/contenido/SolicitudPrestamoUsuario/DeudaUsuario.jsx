import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
const Deudausuario = (Props) =>
{
    let url = "/usuario/"+ Props.id +"/pagoprestamo"
    return(
    <div className="d-flex flex-column d-flex  align-items-center h-100">
        <h1 className="tituloHisotialUsuario text-center border p-1 border-primary bg-primary rounded-pill col-12">Upss! lo sentimos</h1><br/> 
        <div className="d-flex flex-column p-4 bg-informacion">
            <h5 className="">Ya has superado el tope de prestamos <br />
            puedes ir a pagarlo precionando el boton <br />
            Y asi poder solicitad otro prestamo <br /> 
            </h5><h1>Animo!!</h1>
            <Link to = {url} className="btn btn-primary "> Ir a pagar</Link> 
        </div>
        
    </div>
        
    )
}

export default Deudausuario