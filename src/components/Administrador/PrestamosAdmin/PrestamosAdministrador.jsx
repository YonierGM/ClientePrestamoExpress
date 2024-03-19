import React from "react";
import "./PrestamosAdministrador.css";

import { MenuLateralAdmin } from "../MenuLateralAdmin/MenuLateralAdmin";
import { HeaderAdmin } from "../HeaderAdmin/HeaderAdmin";
import { CardInfo } from "../CardInfo/CardInfo";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'    
import { faCaretDown} from '@fortawesome/free-solid-svg-icons';

export const PrestamosAdministrador = () => {
  const Prestamo = [
    {
      name: "Bronze",
      price: "$500k - $3M",
      estado: [
        {
          nameEstado: "Al dia",
          users: 100,
        },
        {
          nameEstado: "Retrazo",
          users: 50,
        },
        {
          nameEstado: "Mora",
          users: 10,
        },
      ],
    },
    {
      name: "Platino",
      price: "$3M - $8M",
      estado: [
        {
          nameEstado: "Al dia",
          users: 100,
        },
        {
          nameEstado: "Retrazo",
          users: 50,
        },
        {
          nameEstado: "Mora",
          users: 10,
        },
      ],
    },
    {
      name: "Gold",
      price: "$8M - $20M",
      estado: [
        {
          nameEstado: "Al dia",
          users: 100,
        },
        {
          nameEstado: "Retrazo",
          users: 50,
        },
        {
          nameEstado: "Mora",
          users: 10,
        },
      ],
    },
  ];

  return (
    <div className="adminContent">
      <div className="adminContent-menu">{<MenuLateralAdmin />}</div>
      <div className="adminContent-home">
        <div className="HeaderAdmin">{<HeaderAdmin />}</div>
        <div className="AdminContent-main">
          <article className="CardInfo">
            {Prestamo.map((item, index) => (
              <div className="Tipo">
                <div className="HeaderCardComponent">
                  <h1>
                    {item.name} <span>( {item.price} )</span>
                  </h1>

                  <div className="Details">
                    <p>View Details</p>
                    <FontAwesomeIcon icon={faCaretDown} />
                  </div>
                </div>
                <div className="cards">
                        
                
                {item.estado.map((item2, index) => (

                <>
                    {
                      <CardInfo
                        name={item.name}
                        price={item.price}
                        nameEstado={item2.nameEstado}
                        users={item2.users}
                      />
                    }
                </>
            
                ))}
                </div>

              </div>
            ))}
          </article>
        </div>
      </div>
    </div>
  );
};

export default PrestamosAdministrador;
