import React, { useState, useEffect } from "react";
import HeaderAdmin from '../../Compartidos/HeaderAdmin/HeaderAdmin'
import CardInfo from '../../../../components/Administrador/Compartidos/CardInfo/CardInfo'; // Asumiendo que CardInfo es un componente definido

import { Notify } from "notiflix/build/notiflix-notify-aio";

import { Loading } from "notiflix/build/notiflix-loading-aio";
import { Confirm } from "notiflix/build/notiflix-confirm-aio";

const PrestamosAdministrador = () => {
  const [prestamos, setPrestamos] = useState([]);
  const [tiposPrestamo, setTiposPrestamo] = useState([]);

  useEffect(() => {
    Loading.standard();
    // Obtener datos de préstamos
    fetch("http://localhost:8000/prestamos")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch");
        }
        return response.json();
      })
      .then((data) => {
        // Actualizar el estado con los datos de préstamos
        setPrestamos(data);
        // Procesar los préstamos para contar cuántos están al día, en retraso y en mora
        let tipos = {};
        data.forEach((prestamo) => {
          // Contar la cantidad de préstamos por cada tipo
          const tipoPrestamo = prestamo.descripcion_tipoprestamo;
          tipos[tipoPrestamo] = tipos[tipoPrestamo] ? tipos[tipoPrestamo] + 1 : 1;
        });
        // Convertir el objeto en un array de objetos para facilitar su renderizado
        const tiposArray = Object.keys(tipos).map((tipo) => ({
          tipo: tipo,
          cantidad: tipos[tipo],
        }));
        // Actualizar el estado con la información de los tipos de préstamo
        setTiposPrestamo(tiposArray);
      })
      .catch((error) => {
        console.error("Error fetching loans:", error);
      })
      .finally(() => {
        Loading.remove();
      });
  }, []);

  return (
    <div className="ContentMain">
      <div className="AdminContent-main">
      <div className="adminContent-home">
      <div className="HeaderAdmin">
        {/* {<HeaderAdmin />} */}
      </div>
      <div>
        <h1>Resumen prestamos</h1>
      </div>

      <article className="CardInfo d-flex justify-content-between gap-2 flex-wrap-wrap">
        {tiposPrestamo.map((tipo, index) => (
          <div className="Tipo w-100" key={index}>
            {/* Aquí puedes agregar el componente CardInfo para mostrar información adicional */}
            {/* Por ejemplo, puedes pasarle los datos del tipo de préstamo y la cantidad */}
            <CardInfo tipo={tipo.tipo} cantidad={tipo.cantidad} />
          </div>
        ))}
      </article>
    </div>

      </div>
    </div>
  );
};

export default PrestamosAdministrador;
