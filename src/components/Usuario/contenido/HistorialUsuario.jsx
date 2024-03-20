import React, { useEffect, useState } from "react";
import axios from "axios";

//Importaciones estilos
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/HistorialUsuario.css";

const Historial = (Props) => {
  const [prestamo, setPrestamo] = useState(null);
  const urlprestamo = "http://127.0.0.1:8000/prestamo/" + Props.id;
  const [roles, setRoles] = useState(null);
  const urlroles = "http://127.0.0.1:8000/roles";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responsePrestamo = await axios.get(urlprestamo);
        setPrestamo(responsePrestamo.data);
        const response = await axios.get(urlroles);
        setRoles(response.data);
      } catch (e) {
        console.error("Error fetching data: ", e);
      }
    };
    fetchData();
  }, []);
  console.log(prestamo);
  if (prestamo == null || roles == null) {
    return <p>no ha cargado</p>;
  }
  const seleccionadorOpciones = (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    const key = selectedOption.getAttribute('data-key');
    if(key !== null)
    {
      roles['Roles'].map(item =>{
        if(item.tipoprestamoid == key)
        {
          
        }
      })
    }
};
  function Estadoprestamo(numero)
  {
    return numero == 1 ? "Activo" : (numero == 2 ? "Pagado" : "Mora")
  }
  function EstadoprestamoEstilo(numero)
  {
    let estiloconstante = " card cardTamano text-white col-4 m-1 "
    return numero == 1 ? "bg-primary" + estiloconstante : (numero == 2 ? "bg-success" +estiloconstante : " bg-Warning" +estiloconstante)
  }
  function Roles(rol)
  {
    return(roles['Roles'].map(item =>{
      if(item.tipoprestamoid == rol)
      {
        return item.descripcion
      }
    }))
  }
  return (
    <div className="card text-dark bg-transparent mt-3 h-75 overflow-auto">
      <div className="card-header text-light bg-primary">
       <h1 className="text-center">Histotial de prestamos</h1> 
      </div>
      <div className="card-body d-flex justify-content-center">
        <div className="d-flex row w-100">
          {prestamo['prestamo'].map(item =>(
            <div className={EstadoprestamoEstilo(item.estadoid)}>
              <div className="card-header "><h2>{Estadoprestamo(item.estadoid)}</h2></div>
              <div className="card-body">
                <h5 className="card-title"> {Roles(item.tipoprestamoid)}</h5>
                <p className="card-text">
                  <strong>Monto :</strong> {item.monto} <br/> 
                  <strong>Cuotas:</strong> {item.cuotas} <br/> 
                  <strong>Fecha de inicio:</strong> {item.fechaprestamo} <br/> 
                  <strong>Fecha de finalizacion:</strong> {item.fechaestimadapago} <br/> </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Historial;
