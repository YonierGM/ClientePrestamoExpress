import React from "react";
import "./CardInfo.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight, } from "@fortawesome/free-regular-svg-icons";
import { faWallet } from "@fortawesome/free-solid-svg-icons";

export function CardInfo({ tipo, cantidad }) {
  return (
    <div className="CardContent">
      <div className="MainContent">
        <div className="CardHeader">
          <FontAwesomeIcon icon={faWallet} />
          <p className="NameTipo">{tipo}</p>
        </div>
        <div className="CardBody">
          <p className="TituloItem">Cantidad de registros</p>
          <p className="NumeroUsuarios">{cantidad}</p>
        </div>
      </div>
      <div className="CardFooter">
        <p className="More">More</p>
        <FontAwesomeIcon className="More" icon={faArrowAltCircleRight} />
      </div>
    </div>
  );
}

export default CardInfo;
