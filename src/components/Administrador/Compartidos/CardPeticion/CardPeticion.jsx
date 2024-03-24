import React from "react";
import "./CardPeticion.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight } from "@fortawesome/free-regular-svg-icons";

export function CardPeticion({ name, avatar, tipo, valor }) {
  return (
    <div className="CardContent-peticion">
      <div className="MainContent-peticion">
        <div className="CardHeader-peticion">
          <div className="avatar">
            <img src={avatar} alt="Avatar Cliente" />
          </div>
          <p className="NameTipo">{name}</p>
        </div>
        <div className="CardBody-peticion">
          <p className="TituloItem-peticion">Resumen</p>
          <p className="tipo-peticion">{tipo}</p>
          <p className="valor-peticion">{valor}</p>
        </div>
      </div>
      <div className="CardFooter-peticion">
        <p className="More-peticion">More</p>
        <FontAwesomeIcon
          className="More-peticion"
          icon={faArrowAltCircleRight}
        />
      </div>
    </div>
  );
}

export default CardPeticion;
