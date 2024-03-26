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

export const ListarUsuarios = () => {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    Loading.standard();

    fetch("http://localhost:8000/usuarios")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch loans");
        }
        return response.json();
      })
      .then((data) => {
        setUsuarios(data);
      })
      .catch((error) => {
        console.error("Error fetching loans:", error);
      })
      .finally(() => {
        Loading.remove();
      });
  }, []);

  const handleCreate = () => {
    navigate(`/administrador/dashboard/usuarios/crear`);
  };

  const handleEditClick = (usuarioId) => {
    navigate(`/administrador/dashboard/usuarios/editar/${usuarioId}`);
  };

  const handleDeleteClick = (usuarioId) => {
    Confirm.show(
      "Eliminar Usuario",
      "¿Está seguro de que desea eliminar este Usuario?",
      "Sí",
      "Cancelar",
      () => {
        fetch(`http://localhost:8000/usuarios/${usuarioId}`, {
          method: "DELETE",
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to delete loan");
            }
            return response.json();
          })
          .then((data) => {
            Notify.success("Usuario eliminado");
            console.log("Loan deleted successfully:", data);
            fetchUsuarios();
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

  const fetchUsuarios = () => {
    Loading.standard();
    fetch("http://localhost:8000/usuarios")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch loans");
        }
        return response.json();
      })
      .then((data) => {
        setUsuarios(data);
      })
      .catch((error) => {
        console.error("Error fetching loans:", error);
      })
      .finally(() => {
        Loading.remove();
      });
  };

  // Define la longitud máxima para el texto de la contraseña
  const MAX_PASSWORD_LENGTH = 80;

  return (
    <div className="AdminContent-main">
      <div className="RegistrosPrestamos">
        <div className="HeaderTable d-flex justify-content-between">
          <button
            className="Create btn btn-success"
            onClick={() => handleCreate()}
          >
            <FontAwesomeIcon className="icon" icon={faPlus} /> Nuevo Usuario
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
              <th>Username</th>
              <th>Contraseña</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((item, index) => (
              <tr key={index}>
                <td>{item.username}</td>
                <td className="password">
                <p>{item.passw.length > MAX_PASSWORD_LENGTH ? `${item.passw.slice(0, MAX_PASSWORD_LENGTH)}...` : item.passw}</p>
                </td>
                <td className="d-flex gap-2">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => handleEditClick(item.usuarioid)}
                  >
                    <FontAwesomeIcon className="icon" icon={faPenToSquare} />
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => handleDeleteClick(item.usuarioid)}
                  >
                    <FontAwesomeIcon className="icon" icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {usuarios.length < 1 && (
          <span className="mensajeError">No hay coincidencias</span>
        )}
      </div>
    </div>
  );
};

export default ListarUsuarios;
