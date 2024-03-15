import React from "react";
import './css/BarraLateral.css'

import 'bootstrap/dist/css/bootstrap.min.css';
import imgPerfil from './img/usuario-de-perfil.png'
const Perfil = (Props) =>
{
    return(
        <div className="text-light d-flex ContainerPerfil">
            <img src={imgPerfil} className="imgPerfil" />
            <p className="PerfilNombre">{Props.name}</p>
        </div>
    )
}

export default Perfil