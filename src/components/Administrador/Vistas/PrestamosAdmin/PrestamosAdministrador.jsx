import React, { useState, useEffect } from "react";
import "./PrestamosAdministrador.css";

import { HeaderAdmin } from "../../Compartidos/HeaderAdmin/HeaderAdmin";
import { CardInfo } from "../../Compartidos/CardInfo/CardInfo";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

export const PrestamosAdministrador = () => {

  const [prestamos, setPrestamos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Obtener datos de préstamos
    fetch('http://localhost:8000/prestamos')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        return response.json();
      })
      .then(data => {
        setPrestamos(data);
      })
      .catch(error => {
        setError(error.message);
      });

    // Obtener datos de clientes
    fetch('http://localhost:8000/clientes')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        return response.json();
      })
      .then(data => {
        setClientes(data);
      })
      .catch(error => {
        setError(error.message);
      });
  }, []);

  // Función para obtener el nombre del cliente por clienteid
  const getNombreCliente = (clienteid) => {
    const cliente = clientes.find(cliente => cliente.clienteid === clienteid);
    return cliente ? cliente.nombre : 'Desconocido';
  };


  const [searchTipo, setSearchTipo] = useState(""); // Estado para almacenar la búsqueda
  
  let resultsPrestamo = []

  const handleSearchTipoChange = (value) => {
    setSearchTipo(value); // Actualiza el estado de búsqueda
  };

  const Prestamos = [
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

  resultsPrestamo = Prestamos.filter((dato) => {
    if (searchTipo.length > 1) {
      return dato.name
      .toLowerCase()
      .includes(searchTipo.toLowerCase());
      
    }else{
      return resultsPrestamo = Prestamos
    }

  })

  return (
    <div className="adminContent-home">
      <div className="HeaderAdmin">
        {<HeaderAdmin onSearchChange={handleSearchTipoChange} />}
      </div>
      <div className="">

      <div>
      <h1>Listado de préstamos</h1>
      {error && <p>{error}</p>}
      <ul>
        {prestamos.map(prestamo => (
          <li key={prestamo.prestamoid}>
            {getNombreCliente(prestamo.clienteid)} - {prestamo.monto}
          </li>
        ))}
      </ul>
    </div>
    
        <article className="CardInfo">
          {resultsPrestamo.map((item, index) => (
            <div className="Tipo" key={index}>
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
                  <div key={index}>
                    {
                      <CardInfo
                        name={item.name}
                        price={item.price}
                        nameEstado={item2.nameEstado}
                        users={item2.users}
                      />
                    }
                  </div>
                ))}
              </div>
            </div>
          ))}
        </article>
        {resultsPrestamo.length < 1 || searchTipo.length < 0? (
          <span className="mensajeError">No hay conincidencias</span>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default PrestamosAdministrador;
