import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import Formulario from "./SolicitudPrestamoUsuario/Formulario";
import Deudausuario from "./SolicitudPrestamoUsuario/DeudaUsuario";
const SolicitudPrestamo = (Props) =>
{
    let deuda = null
    const [prestamo, setPrestamo] = useState(null);
    const urlprestamo = "http://127.0.0.1:8000/prestamo/" + Props.id;

    useEffect(() => {
      const fetchData = async () => {
        try {
          
          const responsePrestamo = await axios.get(urlprestamo);
          setPrestamo(responsePrestamo.data);
        } catch (e) {
          console.error("Error fetching data: ", e);
        }
      };
      fetchData();
    },[]);


   
    if(prestamo)
    {
        deuda = false;
        prestamo['prestamo'].map(item =>{
            if(item.estadoid === 1)
            {
                deuda = true
            }
        })
    }
   
        if(!deuda)
        {
            return(<Deudausuario/>)
        }else
        {
            return <Formulario id={Props.id}/>
        }
        
}


export default SolicitudPrestamo