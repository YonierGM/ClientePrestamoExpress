import "./HeaderAdmin.css";
import React, { useState } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'    
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export const HeaderAdmin = ({ onSearchChange }) => {
  const [searchtipo, setSearchTipo] = useState("");

  const searchTipo = (e) => {
    setSearchTipo(e.target.value);
    onSearchChange(searchtipo) // Llama a la función del padre con el nuevo valor
  };

  return (
    <div className="header">
      <div className="input">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        <input type="text" placeholder="Search by type"
            value={searchtipo}
            onChange={searchTipo} />
      </div>
      <div className="infoUser">
        <div className="infoUser-descripcion">
          <p className="name">NameUser</p>
          <p className="rol">Administrador</p>
        </div>
      </div>
    </div>
  );
};

export default HeaderAdmin
