import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Modal, Button } from "react-bootstrap";

import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

export const ListarPrestamos = () => {
  const [prestamos, setPrestamos] = useState([]);
  const [prestamo, setPrestamo] = useState({});

  const [showModal, setShowModal] = useState(false);

  const [prestamoid, setPrestamoid] = useState();
  const [fechaprestamo, setFechaprestamo] = useState("");
  const [fechaestimadapago, setFechaestimadapago] = useState("");
  const [monto, setMonto] = useState("");
  const [cuotas, setCuotas] = useState("");
  const [valorcuota, setValorcuota] = useState("");
  const [clienteid, setClienteid] = useState("");
  const [estadoid, setEstadoid] = useState("");
  const [tipoprestamoid, setTipoprestamoid] = useState("");

  useEffect(() => {
    Notiflix.Loading.standard();

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
        Notiflix.Loading.remove();
      });
  }, []);

  const handleEditClick = (prestamoId) => {
    fetch(`http://localhost:8000/prestamos/${prestamoId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch loan details");
        }
        return response.json();
      })
      .then((data) => {
        setPrestamo(data);

        setPrestamoid(data.prestamoid);
        setFechaprestamo(data.fechaprestamo);
        setFechaestimadapago(data.fechaestimadapago);
        setMonto(data.monto);
        setCuotas(data.cuotas);
        setValorcuota(data.valorcuota);
        setClienteid(data.clienteid);
        setEstadoid(data.estadoid);
        setTipoprestamoid(data.tipoprestamoid);
        setShowModal(true);
      })
      .catch((error) => {
        console.error("Error fetching loan details:", error);
      });
  };

  const handleEditSubmit = async (e) => {
    Notiflix.Loading.standard();

    console.log(prestamoid)
    e.preventDefault();

    const data = {
      prestamoid,
      fechaprestamo,
      fechaestimadapago,
      monto,
      cuotas,
      valorcuota,
      clienteid,
      estadoid,
      tipoprestamoid
    };

    try {
      const response = await fetch(`http://localhost:8000/prestamos/${prestamoid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        Loading.remove();
        Notify.failure("Error al crear administrador");
        throw new Error("Error al crear administrador");
      }
      fetchPrestamos()
      Loading.remove();
      Notify.success("Prestamo actualizado exitosamente");
    } catch (error) {
      Loading.remove();
      console.error("Error al crear administrador:", error);
    }
    setShowModal(false);
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
            console.log("Loan deleted successfully:", data);
            fetchPrestamos();
          })
          .catch((error) => {
            console.error("Error deleting loan:", error);
          });
      },
      () => {
        console.log("Cancelado");
      }
    );
  };

  const fetchPrestamos = () => {
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
      });
  };

  return (
    <div className="AdminContent-main">
      <div className="RegistrosPrestamos">
        <div className="search">
          <input type="text" placeholder="Search Prestamo" />
          <button className="btn btn-primary">
            <FontAwesomeIcon className="icon" icon={faMagnifyingGlass} />
          </button>
        </div>
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
            </tr>
          </thead>
          <tbody>
            {prestamos.map((item, index) => (
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
                        : item.descripcion_estadoPrestamo === "Activo"
                        ? "Activo"
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
                <td>
                  <div className="opciones">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => handleEditClick(item.prestamoid)}
                    >
                      <FontAwesomeIcon className="icon" icon={faPenToSquare} />
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => handleDeleteClick(item.prestamoid)}
                    >
                      <FontAwesomeIcon className="icon" icon={faTrash} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {prestamos.length < 1 && (
          <span className="mensajeError">No hay coincidencias</span>
        )}
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Préstamo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleEditSubmit}>
            {/* <div className="form-group">
              <label htmlFor="fechaprestamo">Prestamo id</label>
              <input
                type="text"
                className="form-control"
                id="fechaprestamo"
                value={prestamoid}
                onChange={(e) => setFechaprestamo(e.target.value)}
              />
            </div> */}
            <div className="form-group">
              <label htmlFor="fechaprestamo">Fecha de Préstamo</label>
              <input
                type="text"
                className="form-control"
                id="fechaprestamo"
                value={fechaprestamo}
                onChange={(e) => setFechaprestamo(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="fechaestimadapago">Fecha Estimada de Pago</label>
              <input
                type="text"
                className="form-control"
                id="fechaestimadapago"
                value={fechaestimadapago}
                onChange={(e) => setFechaestimadapago(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="monto">Monto</label>
              <input
                type="text"
                className="form-control"
                id="monto"
                value={monto}
                onChange={(e) => setMonto(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="cuotas">Cuotas</label>
              <input
                type="text"
                className="form-control"
                id="cuotas"
                value={cuotas}
                onChange={(e) => setCuotas(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="valorcuotas">Valor de Cuotas</label>
              <input
                type="text"
                className="form-control"
                id="valorcuotas"
                value={valorcuota}
                onChange={(e) => setValorcuota(e.target.value)}
              />
            </div>
            {/* <div className="form-group">
              <label htmlFor="clienteid">ID del Cliente</label>
              <input
                type="text"
                className="form-control"
                id="clienteid"
                value={clienteid}
                onChange={(e) => setClienteid(e.target.value)}
              />
            </div> */}
            {/* <div className="form-group">
              <label htmlFor="estadoid">ID del Estado</label>
              <input
                type="text"
                className="form-control"
                id="estadoid"
                value={estadoid}
                onChange={(e) => setEstadoid(e.target.value)}
              />
            </div> */}
            {/* <div className="form-group">
              <label htmlFor="tipoprestamoid">ID del Tipo de Préstamo</label>
              <input
                type="text"
                className="form-control"
                id="tipoprestamoid"
                value={tipoprestamoid}
                onChange={(e) => setTipoprestamoid(e.target.value)}
              />
            </div> */}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleEditSubmit}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ListarPrestamos;
