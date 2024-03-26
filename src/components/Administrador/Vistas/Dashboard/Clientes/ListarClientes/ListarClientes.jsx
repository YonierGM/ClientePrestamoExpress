import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faPenToSquare,
  faTrash,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";


import { useNavigate } from "react-router-dom";

import Notiflix from "notiflix";
import { Notify } from "notiflix/build/notiflix-notify-aio";

import { Loading } from "notiflix/build/notiflix-loading-aio";
import { Confirm } from "notiflix/build/notiflix-confirm-aio";

export const ListarClientes = () => {
  const navigate = useNavigate();
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    Loading.standard();

    fetch("http://localhost:8000/clientes")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch loans");
        }
        return response.json();
      })
      .then((data) => {
        setClientes(data);
      })
      .catch((error) => {
        console.error("Error fetching loans:", error);
      })
      .finally(() => {
        Loading.remove();
      });
  }, []);

  const handleCreate = () =>{
    navigate(`/administrador/dashboard/clientes/crear`);
  }

  const handleEditClick = (clienteId) => {
    navigate(`/administrador/dashboard/clientes/editar/${clienteId}`);
  };

  const handleDeleteClick = (clienteId) => {
    Confirm.show(
      "Eliminar Cliente",
      "¿Está seguro de que desea eliminar este cliente?",
      "Sí",
      "Cancelar",
      () => {
        fetch(`http://localhost:8000/clientes/${clienteId}`, {
          method: "DELETE",
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to delete loan");
            }
            return response.json();
          })
          .then((data) => {
            Notify.success("Cliente eliminado");
            console.log("Loan deleted successfully:", data);
            fetchClientes();
          })
          .catch((error) => {
            Notify.failure("Error al eliminar");
            console.error("Error deleting loan:", error);
          });
      },
      () => {
        console.log("Cancelado");
      }
    );
  };

  const fetchClientes = () => {
    Loading.standard();
    fetch("http://localhost:8000/clientes")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch loans");
        }
        return response.json();
      })
      .then((data) => {
        setClientes(data);
      })
      .catch((error) => {
        console.error("Error fetching loans:", error);
      })
      .finally(() => {
        Loading.remove();
      });
  };

  return (
    <div className="AdminContent-main">
      <div className="RegistrosPrestamos">
        <div className="HeaderTable d-flex justify-content-between">

          <button className="Create btn btn-success" onClick={() => handleCreate()}>
            <FontAwesomeIcon className="icon" icon={faPlus} /> Nuevo Cliente
          </button>
          <div className="search d-flex gap-2">
            <input type="text" placeholder="Search Prestamo" />
            <button className="btn btn-primary">
              <FontAwesomeIcon className="icon" icon={faMagnifyingGlass} />
            </button>
          </div> 
   
        </div>
        <hr />
        <table className="table mytable table-hover table-borderless">
          <thead className="">
            <tr>
              <th>Nombre</th>
              <th>apellido</th>
              <th>documento</th>
              <th>fecha nacimiento</th>
              <th>direccion</th>
              <th>celular</th>
              <th>email</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((item, index) => (
              <tr key={index}>
                <td>{item.nombre}</td>
                <td>{item.apellido}</td>
                <td>{item.documento}</td>
                <td>{item.fecha_nac}</td>
                <td>{item.direccion}</td>
                <td>{item.celular}</td>
                <td>{item.email}</td>

                <td className="d-flex gap-2">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => handleEditClick(item.clienteid)}
                  >
                    <FontAwesomeIcon className="icon" icon={faPenToSquare} />
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => handleDeleteClick(item.clienteid)}
                  >
                    <FontAwesomeIcon className="icon" icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {clientes.length < 1 && (
          <span className="mensajeError">No hay coincidencias</span>
        )}
      </div>
    </div>
  );
};

export default ListarClientes;
