import React, { useState }   from "react";
import { Routes, Route, useParams } from 'react-router-dom';

//Comoponentes
import Resumen from "./contenido/UsuarioResumen";
import SolicitudPrestamo from "./contenido/SolicitudPrestamoUsuario";
import Historial from "./contenido/HistorialUsuario";
//Imagenes
import imgPerfil from './BarraLateral/img/usuario-de-perfil.png'
import imgSolicitud from './BarraLateral/img/dinero.png'
import imgProducto from './BarraLateral/img/Productos.png'
import imgHistorial from './BarraLateral/img/reloj.png'
import BarraLateral from "./BarraLateral/Barralateral";
import Perfil from "./BarraLateral/Perfil";

//Estilos
import "./css/InicioUsuarioCss.css";
import './contenido/css/UsuarioResumen.css'
import "bootstrap/dist/css/bootstrap.min.css";
import Productos from "./contenido/UsuraioProductos";

const InicioUsuario = (Props) => {
    let {usuarioid} = useParams();
    console.log(usuarioid)
    const [showOffcanvas, setShowOffcanvas] = useState(false);
  
    const handleToggleOffcanvas = (e) => {
      setShowOffcanvas(false);
    };
    const handleToggleOncanvas = (e) => {
      setShowOffcanvas(true);
    };
    
  return (
    <div id="BarraLatela" className="contenedorUsuario container-fluid bg-fondo">
      <div className="row w-100 h-100 d-flex">
        <div className="col-1 bg-primary " onMouseEnter={handleToggleOncanvas} >
          <div id="ContenidoIconos" className="d-flex flex-column d-flex align-items-center"> 
            <button className="btn btn-primary mt-4" type="button" >
              <img src={imgPerfil} className="imgUsuario" />
            </button>
            <button className="btn btn-primary mt-5" type="button" >
              <img src={imgSolicitud} className="imgUsuario" />
            </button>
            <button className="btn btn-primary mt-4" type="button" >
              <img src={imgProducto} className="imgUsuario" />
            </button>
            <button className="btn btn-primary mt-4" type="button" >
              <img src={imgHistorial} className="imgUsuario" />
            </button>
          </div>
          <div className={`offcanvas offcanvas-start ${showOffcanvas ? "show" : ""}`} tabIndex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel" onMouseLeave={handleToggleOffcanvas}>
            <div className="offcanvas-header bg-primary">
              <h5 className="offcanvas-title " id="staticBackdropLabel">
                <Perfil id={usuarioid} name="Perfil"/>
              </h5>
            </div>
            <div className="offcanvas-body bg-primary">
              <div><BarraLateral id ={usuarioid}/></div>
            </div>
          </div>
        </div>
        <div className="col-11 justify-content-center">
          <Routes>
            <Route path="/" element={<Resumen  id={usuarioid}/>} />
            <Route path="/solicitudprestamo" element = {<SolicitudPrestamo id={usuarioid}/>}/>
            <Route path='/pagoprestamo' element={<Productos id={usuarioid}/>}/>
            <Route path='/historialPrestamos' element={<Historial id={usuarioid}/>}/>
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default InicioUsuario;
