import React, { useState, useEffect } from "react";

import "./DashboardAdmin.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.min.js";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import Notiflix from "notiflix";
import { Loading } from "notiflix/build/notiflix-loading-aio";

export const DashboardAdmin = () => {
  const [prestamos, setPrestamos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [error, setError] = useState(null);

  const [mensajePrestamos, setMensajePrestamos] = useState(false);
  const [mensajeClientes, setMensajeClientes] = useState(false);

  useEffect(() => {
    Notiflix.Loading.standard();

    // Obtener datos de préstamos
    fetch("http://localhost:8000/prestamos")
      .then((response) => {
        if (!response.ok) {
          setMensajePrestamos(true);
          throw new Error("Failed to fetch");
        }
        return response.json();
      })
      .then((data) => {
        setPrestamos(data);
      })
      .catch((error) => {
        setMensajePrestamos(true);
        setError(error.message);
      });

    // Obtener datos de estados
    fetch("http://localhost:8000/estados-prestamo")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch");
        }
        return response.json();
      })
      .then((data) => {
        setEstados(data);
      })
      .catch((error) => {
        setError(error.message);
      });

    // Obtener datos de Tipos de prestamos
    fetch("http://localhost:8000/tiposprestamo")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch");
        }
        return response.json();
      })
      .then((data) => {
        setTiposPrestamos(data);
      })
      .catch((error) => {
        setError(error.message);
      });

    // Obtener datos de clientes
    fetch("http://localhost:8000/clientes")
      .then((response) => {
        if (!response.ok) {
          setMensajeClientes(true);
          throw new Error("Failed to fetch");
        }
        return response.json();
      })
      .then((data) => {
        setClientes(data);
      })
      .catch((error) => {
        setMensajeClientes(true);
        setError(error.message);
      });
  }, []);

  return (
    <div className="AdminContent-main">
      <div className="RegistrosPrestamos">
        <div className="search">
          <div className="selects">
            {/* <select name="filtroPrestamo">
              <option value="cliente">Cliente</option>
              <option value="fechaPrestamo">Fecha Prestamo</option>
            </select>

            <select name="">
              <option value="none">-- Estado del pago --</option>
              <option value="Pendiente">Pendiente</option>
              <option value="Activo">Activo</option>
              <option value="Pagado">Pagado</option>
              <option value="Mora">Mora</option>
            </select> */}
{/* 
            <select name="">
              <option value="none">-- Tipo de Prestamo --</option>
              <option value="Bronze">Bronze</option>
              <option value="Platino">Platino</option>
              <option value="Gold">Gold</option>
            </select> */}
          </div>

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
                <td>
                  {item.nombre_cliente +' '+ item.apellido_cliente}
                </td>
                <td>$ {item.monto}</td>
                <td>{item.fechaprestamo}</td>
                <td>{item.fechaestimadapago}</td>
                <td className="estado">
                  <p
                    className={
                      item.descripcion_estadoPrestamo == "Pendiente"
                        ? "Pendiente"
                        : "" || item.descripcion_estadoPrestamo == "Activo"
                        ? "Activo"
                        : "" || item.descripcion_estadoPrestamo == "Pagado"
                        ? "Pagado"
                        : "" || item.descripcion_estadoPrestamo == "Mora"
                        ? "Mora"
                        : ""
                    }
                  >
                    {item.descripcion_estadoPrestamo}
                  </p>
                </td>
                <td>{item.descripcion_tipoprestamo}</td>
                <td>
                  <button type="button" className="btn btn-secondary">
                    <FontAwesomeIcon
                      className="icon"
                      icon={faMagnifyingGlass}
                    />
                  </button>
                </td>
              </tr>
            ))}
            {Loading.remove()}
          </tbody>
        </table>
        {mensajePrestamos != false ? (
          <span className="mensajeError">No hay conincidencias</span>
        ) : (
          ""
        )}
      </div>

      <div className="RegistrosClientes">
        <div className="search">
          <select name="filtroCliente">
            <option value="nombre">Nombre</option>
            <option value="documento">Documento</option>
            <option value="celular">Celular</option>
            <option value="email">Email</option>
          </select>
          <input type="text" placeholder="Search Cliente" />
          <button className="btn btn-primary">
            <FontAwesomeIcon className="icon" icon={faMagnifyingGlass} />
          </button>
        </div>
        <hr />
        <table className="table mytable table-hover table-borderless">
          <thead className="">
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Documento</th>
              <th>Celular</th>
              <th>Email</th>
              <th>Dirección</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((item, index) => (
              <tr key={index}>
                <td>{item.nombre}</td>
                <td>{item.apellido}</td>
                <td>{item.documento}</td>
                <td>{item.celular}</td>
                <td>{item.email}</td>
                <td>{item.direccion}</td>
                <td>
                  <button type="button" className="btn btn-secondary">
                    <FontAwesomeIcon
                      className="icon"
                      icon={faMagnifyingGlass}
                    />
                  </button>
                </td>
              </tr>
            ))}
            {Loading.remove()}
          </tbody>
        </table>

        {mensajeClientes == true ? (
          <span className="mensajeError">No hay conincidencias</span>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default DashboardAdmin;
