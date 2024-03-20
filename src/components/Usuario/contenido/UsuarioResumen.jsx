import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './css/UsuarioResumen.css'
import axios from "axios";
const Resumen = (Props) => {
  const [data, setData] = useState(null);
  const url = "http://127.0.0.1:8000/cliente/" + Props.id;
  console.log(url);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setData(response.data);
      } catch (e) {
        console.error("Error fetching data: ", e);
      }
    };
    fetchData();
  }, []);
  if (data === null) {
    return <p>Cargando...</p>;
  }
  console.log(data);
  return (
    <>
    <div className="d-flex flex-column justify-content-center align-items-center ">
      <div className="col-6">
      <h1 className="TituloResumen border border-primary bg-primary rounded-pill"> Bienvenido {data[0]["nombre"]} </h1>
      <div className="card text-dark mb-3 bg-transparent">
        <div className="card-header bg-primary "><h2 className="card-title text-light"> Datos Personales</h2></div>
        <div className="card-body  bg-informacion ">
          <p className="card-text">
           <p className="TextoPerfilUsuario "><strong>Nombre completo: </strong> {data[0]['nombre']} {data[0]['apellido']}</p>  
            <p className="TextoPerfilUsuario"><strong>Region: </strong> {data[0]['direccion']} </p>
            <p className="TextoPerfilUsuario"> <strong>Correo Electronico: </strong> {data[0]['email']}</p>
            <p className="TextoPerfilUsuario"><strong>Celular: </strong> {data[0]['celular']}</p> 
          </p>
        </div>
      </div> 
      </div>
    </div>
      
    </>
  );
};

export default Resumen;
