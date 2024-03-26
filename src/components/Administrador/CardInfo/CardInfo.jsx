import React from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faArrowAltCircleRight } from '@fortawesome/free-regular-svg-icons';

import './CardInfo.css'
export function CardInfo({name, price, nameEstado, users})
{
    return(
        
        <section className="CardComponent">

        <div className={nameEstado == 'Al dia' ? 'CardContent': '' || nameEstado == 'Retrazo' ? 'Retrazo CardContent': '' || nameEstado == 'Mora' ? 'Mora CardContent': ''}>
            <div className="MainContent">
                <div className="CardHeader">
                    <FontAwesomeIcon icon={ faClock} />
                    <p className="NameTipo">{nameEstado}</p>
                </div>
                <div className="CardBody">
                    <p className="TituloItem">Usuarios</p>
                    <p className="NumeroUsuarios">{users}</p>
                </div>
            </div>
            <div className="CardFooter">
                <p className="More">More</p>
                <FontAwesomeIcon className="More" icon={ faArrowAltCircleRight} />
            </div>

        </div>
        </section>
    ) 
};

export default CardInfo
