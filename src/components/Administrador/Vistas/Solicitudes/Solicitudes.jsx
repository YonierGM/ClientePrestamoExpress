import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faPenToSquare,
  faTrash,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

import { useNavigate } from "react-router-dom";

import { Notify } from "notiflix/build/notiflix-notify-aio";

import { Loading } from "notiflix/build/notiflix-loading-aio";

import { Confirm } from "notiflix/build/notiflix-confirm-aio";

export const Solicitudes = () => {
  const navigate = useNavigate();
  const [prestamos, setPrestamos] = useState([]);

  useEffect(() => {
    Loading.standard();

    fetch("http://localhost:8000/prestamos")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch loans");
        }
        return response.json();
      })
      .then((data) => {
        setPrestamos(data);
      })
      .catch((error) => {
        console.error("Error fetching loans:", error);
      })
      .finally(() => {
        Loading.remove();
      });
  }, []);

  const handleCreate = () => {
    navigate(`/administrador/dashboard/prestamos/crear`);
  };

  const handleEditClick = (prestamoId) => {
    navigate(`/administrador/dashboard/prestamos/editar/${prestamoId}`);
  };

  const handleDeleteClick = (prestamoId) => {
    Confirm.show(
      "Eliminar Préstamo",
      "¿Está seguro de que desea eliminar este préstamo?",
      "Sí",
      "Cancelar",
      () => {
        fetch(`http://localhost:8000/prestamos/${prestamoId}`, {
          method: "DELETE",
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to delete loan");
            }
            return response.json();
          })
          .then((data) => {
            Notify.success("Prestamo eliminado");
            console.log("Loan deleted successfully:", data);
            fetchPrestamos();
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

  const fetchPrestamos = () => {
    Loading.standard();
    fetch("http://localhost:8000/prestamos")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch loans");
        }
        return response.json();
      })
      .then((data) => {
        setPrestamos(data);
      })
      .catch((error) => {
        console.error("Error fetching loans:", error);
      })
      .finally(() => {
        Loading.remove();
      });
  };

  const prestamosPendientes = prestamos.filter(
    (prestamo) => prestamo.descripcion_estadoPrestamo === "Pendiente"
  );

  return (
    
    <div className="AdminContent-main">
      <h1 className="h1">Solicitudes</h1>
      <div className="RegistrosPrestamos">
        <hr />
        <table className="table mytable table-hover table-borderless">
          <thead className="">
            <tr>
              <th>Cliente</th>
              <th>Monto</th>
              <th>Fecha Prestamo</th>
              <th>Fecha Pago</th>
              <th>Estado Pago</th>
              <th>Tipo</th>
              <th>Aceptar / Descartar</th>
            </tr>
          </thead>
          <tbody>
            {prestamosPendientes.map((item, index) => (
              <tr key={index}>
                <td>{item.nombre_cliente + " " + item.apellido_cliente}</td>
                <td>$ {item.monto}</td>
                <td>{item.fechaprestamo}</td>
                <td>{item.fechaestimadapago}</td>
                <td className="estado">
                  <p
                    className={
                      item.descripcion_estadoPrestamo === "Pendiente"
                        ? "Pendiente"
                        : item.descripcion_estadoPrestamo === "Al dia"
                        ? "Al-dia"
                        : item.descripcion_estadoPrestamo === "Retrazo"
                        ? "Retrazo"
                        : item.descripcion_estadoPrestamo === "Pagado"
                        ? "Pagado"
                        : item.descripcion_estadoPrestamo === "Mora"
                        ? "Mora"
                        : ""
                    }
                  >
                    {item.descripcion_estadoPrestamo}
                  </p>
                </td>
                <td>{item.descripcion_tipoprestamo}</td>
                <td className="d-flex gap-2">
                  <button
                    type="button"
                    className="btn"
                    onClick={() => handleEditClick(item.prestamoid)}
                  >
                    <FontAwesomeIcon className="icon" icon={faPenToSquare} />
                  </button>
                  <button
                    type="button"
                    className="btn"
                    onClick={() => handleDeleteClick(item.prestamoid)}
                  >
                    <FontAwesomeIcon className="icon" icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {prestamosPendientes.length < 1 && (
          <span className="mensajeError">No hay coincidencias</span>
        )}
      </div>
    </div>
  );
};

export default Solicitudes;
