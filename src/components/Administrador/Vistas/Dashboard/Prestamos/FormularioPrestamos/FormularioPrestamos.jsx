import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./FormularioPrestamos.css";
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export const FormularioPrestamos = () => {
  const { prestamoid } = useParams();
  const [prestamo, setPrestamo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log(prestamoid)
  
  useEffect(() => {
    // Obtener detalles del préstamo
    fetch(`http://localhost:8000/prestamos/${prestamoid}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch");
        }
        return response.json();
      })
      .then((data) => {
        setPrestamo(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [prestamoid]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="DatosAdminContent">
      <h3>EDITAR PRÉSTAMO</h3>
      <form>

        <label>Monto:</label>
        <input type="text" value={prestamo.monto} />

        <label>fecha prestamo:</label>
        <input type="text" value={prestamo.fechaprestamo} />

        <label>fecha prestamo:</label>
        <input type="text" value={prestamo.fechaestimadapago} /> 

        <label>Cuotas:</label>
        <input type="text" value={prestamo.cuotas} /> 

        
        <label>valor cuota:</label>
        <input type="text" value={prestamo.valorcuota} /> 

        <label>valor cuota:</label>
        <input type="text" value={prestamo.valorcuota} /> 

        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default FormularioPrestamos;
