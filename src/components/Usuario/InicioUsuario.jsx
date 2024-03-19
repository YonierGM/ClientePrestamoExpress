import React, { useState }   from "react";
import { Routes, Route } from 'react-router-dom';

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

    const [showOffcanvas, setShowOffcanvas] = useState(false);
  
    const handleToggleOffcanvas = () => {
      setShowOffcanvas(false);
    };
    const handleToggleOncanvas = () => {
      setShowOffcanvas(true);
    };
    
  return (
    <div id="BarraLatela" className="contenedorUsuario container-fluid ">
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
                <Perfil name="Perfil"/>
              </h5>
            </div>
            <div className="offcanvas-body bg-primary">
              <div><BarraLateral/></div>
            </div>
          </div>
        </div>
        <div className="col-10 d-flex justify-content-center">
          <Routes>
            <Route  path="/" element={<Resumen  id={Props.id}/>} />
            <Route path="/solicitudprestamo" element = {<SolicitudPrestamo id={Props.id}/>}/>
            <Route path='/pagoprestamo' element={<Productos id={Props.id}/>}/>
            <Route path='/historialPrestamos' element={<Historial id={Props.id}/>}/>
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default InicioUsuario;
