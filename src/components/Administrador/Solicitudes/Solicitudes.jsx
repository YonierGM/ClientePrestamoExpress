import React from "react";
import "./Solicitudes.css";

import { MenuLateralAdmin } from "../MenuLateralAdmin/MenuLateralAdmin";
import { HeaderAdmin } from "../HeaderAdmin/HeaderAdmin";
import { CardPeticion } from "../CardPeticion/CardPeticion";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'    
import { faCaretDown} from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter } from "react-router-dom";

export const Solicitudes = () => {
    const Solicitudes = 
    [
        {
            name: "Maria Jose",
            avatar: "https://unavatar.io/@jessicacediel",
            tipo: "Bronze",
            valor: "2M"
        },
        {
              name: "Julio perez",
              avatar: "https://unavatar.io/@3gerardpique",
              tipo: "Platino",
              valor: "8M"
        }
    ]
        
      return (
        <div className="adminContent">
        
          <div className="adminContent-menu">{<MenuLateralAdmin />}</div>
       
          <div className="adminContent-home AdminContent-home-peticiones">
            <div className="HeaderAdmin">{<HeaderAdmin />}</div>
            <div className="AdminContent-main-peticiones">
              <article className="CardInfo-peticiones">
                
                  <div className="Content-peticiones">
                    <div className="HeaderCardComponent-peticion">
                      <h1>
                        Pendientes
                      </h1>
    
                      <div className="Details-peticiones">
                        <p>View Details</p>
                        <FontAwesomeIcon icon={faCaretDown} />
                      </div>
                    </div>
                    <div className="cards-peticiones">
                    {Solicitudes.map((item, index) => (
                        <div className="cardPeticion">
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
            </div>
          </div>
        </div>
      );
    };

export default Solicitudes;
