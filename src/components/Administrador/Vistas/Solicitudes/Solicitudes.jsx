import React, { useState, useEffect } from "react";
import "./Solicitudes.css";

import { HeaderAdmin } from "../../Compartidos/HeaderAdmin/HeaderAdmin";
import { CardPeticion } from "../../Compartidos/CardPeticion/CardPeticion";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

export const Solicitudes = () => {
  const [searchSolicitud, setSearchSolicitud] = useState(""); // Estado para almacenar la búsqueda

  const handleSearchSolicitudChange = (value) => {
    setSearchSolicitud(value); // Actualiza el estado de búsqueda
  };

  const Solicitudes = [
    {
      name: "Maria Jose",
      avatar: "https://unavatar.io/@jessicacediel",
      tipo: "Bronze",
      valor: "2M",
    },
    {
      name: "Julio perez",
      avatar: "https://unavatar.io/@3gerardpique",
      tipo: "Platino",
      valor: "8M",
    },
  ];

  let resultsSolicitud = []

  resultsSolicitud = Solicitudes.filter((dato) => {
    if (searchSolicitud.length > 1) {
      return dato.name
      .toLowerCase()
      .includes(searchSolicitud.toLowerCase());
      
    }else{
      return resultsSolicitud = Solicitudes
    }
  })

  return (
    <div className="adminContent">
      <div className="AdminContent-home-peticiones">
        <div className="HeaderAdmin">{<HeaderAdmin onSearchChange={handleSearchSolicitudChange} />}</div>
        <div className="AdminContent-main-peticiones">
          <article className="CardInfo-peticiones">
            <div className="Content-peticiones">
              <div className="HeaderCardComponent-peticion">
                <h1>Pendientes</h1>

                <div className="Details-peticiones">
                  <p>View Details</p>
                  <FontAwesomeIcon icon={faCaretDown} />
                </div>
              </div>
              <div className="cards-peticiones">
                {resultsSolicitud.map((item, index) => (
                  <div className="cardPeticion" key={index}>
                    <>
                      {
                        <CardPeticion
                          name={item.name}
                          avatar={item.avatar}
                          tipo={item.tipo}
                          valor={item.valor}
                        />
                      }
                    </>
                  </div>
                ))}
              </div>
            </div>
          </article>
          {resultsSolicitud.length < 1 || searchSolicitud.length < 0? (
          <span className="mensajeError">No hay conincidencias</span>
        ) : (
          ""
        )}
        </div>
      </div>
    </div>
  );
};

export default Solicitudes;
