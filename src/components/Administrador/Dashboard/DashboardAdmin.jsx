import React, { useState, useEffect } from "react";

import "./DashboardAdmin.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.min.js";

import { MenuLateralAdmin } from "../MenuLateralAdmin/MenuLateralAdmin";
import { Routes, Route } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import { PrestamosAdministrador } from '../PrestamosAdmin/PrestamosAdministrador'
import { Solicitudes } from '../Solicitudes/Solicitudes'

export const DashboardAdmin = () => {

  //setear los hooks useState

  const [clientes, setClientes] = useState([]);
  const [searchclientes, setSearchClientes] = useState("");
  const [selectClientes, setSelectClientes] = useState("nombre");

  const [prestamos, setPrestamos] = useState([]);
  const [searchprestamos, setSearchPrestamos] = useState("");
  const [selectPrestamos, setSelectPrestamos] = useState("cliente");

  const showDataClientes = () => {
    const Clientes = [
      {
        nombre: "Luis",
        apellido: "Solorzano",
        documento: "25433684",
        celular: "3156478890",
        email: "luiss@gmail.com",
        direccion: "Medellin, Colombia",
      },
      {
        nombre: "Miguel",
        apellido: "Dominguez",
        documento: "25433753",
        celular: "3106628890",
        email: "miguel@gmail.com",
        direccion: "Medellin, Colombia",
      },
    ];

    setClientes(Clientes);
  };

  const showDataPrestamos = () => {
    const Prestamos = [
      {
        fechaPrestamo: "2023-01-21",
        fechaPago: "2024-01-21",
        monto: 5000000,
        cantCuotas: 10,
        valorCuota: 500000,
        cliente: "Luis Solorzano",
        estadoPago: "Pendiente",
        tipoPrestamo: "Platino",
      },
      {
        fechaPrestamo: "2022-01-21",
        fechaPago: "2023-01-21",
        monto: 4000000,
        cantCuotas: 2,
        valorCuota: 2000000,
        cliente: "Miguel Dominguez",
        estadoPago: "Activo",
        tipoPrestamo: "Platino",
      },
    ];

    setPrestamos(Prestamos);
  };

  //función de búsqueda clientes
  const searchClientes = (e) => {
    setSearchClientes(e.target.value);
  };

  //función de búsqueda prestamos
  const searchPrestamos = (e) => {
    setSearchPrestamos(e.target.value);
  };

  const valorSelectClientes = (e) => {
    setSelectClientes(e.target.value);
  };

  const valorSelectPrestamos = (e) => {
    setSelectPrestamos(e.target.value);
  };

  //metodo de filtrado clientes
  const resultsClientes = clientes.filter((dato) => {
    if (selectClientes && selectClientes !== "" && dato[selectClientes]) {
      return dato[selectClientes]
        .toLowerCase()
        .includes(searchclientes.toLowerCase());
    }
    return true;
  });

  //metodo de filtrado Prestamos
  const resultsPrestamos = prestamos.filter((dato) => {
    if (selectPrestamos && selectPrestamos !== "" && dato[selectPrestamos]) {
      return dato[selectPrestamos]
        .toLowerCase()
        .includes(searchprestamos.toLowerCase());
    }
    return true;
  });

  useEffect(() => {
    showDataClientes();
  }, []);

  useEffect(() => {
    showDataPrestamos();
  }, []);

  return (
    <div className="adminContent">
      <div className="adminContent-menu">{<MenuLateralAdmin />}</div>
      <div className="adminContent-home">
        {/* <div className="HeaderAdmin">{<HeaderAdmin />}</div> */}
        <div className="AdminContent-main">
          <div className="Registros RegistrosPrestamos">
            <div className="search">
              <select name="filtroPrestamo" onChange={valorSelectPrestamos}>
                <option value="cliente">Cliente</option>
                <option value="fechaPrestamo">Fecha Prestamo</option>
                <option value="estadoPago">Estado del pago</option>
                <option value="tipo">Tipo del prestamo</option>
              </select>
              <input
                value={searchprestamos}
                onChange={searchPrestamos}
                type="text"
                placeholder="Search Prestamo"
              />
              <button className="btn btn-primary">
                <FontAwesomeIcon className="icon" icon={faMagnifyingGlass} />
              </button>
            </div>
            <hr />
            <table class="table mytable table-hover table-borderless">
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
                {resultsPrestamos.map((item, index) => (
                  <tr>
                    <td>{item.cliente}</td>
                    <td>$ {item.monto}</td>
                    <td>{item.fechaPrestamo}</td>
                    <td>{item.fechaPago}</td>
                    <td>{item.estadoPago}</td>
                    <td>{item.tipoPrestamo}</td>
                    <td>
                      <button type="button" class="btn btn-secondary">
                        <FontAwesomeIcon
                          className="icon"
                          icon={faMagnifyingGlass}
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="Registros RegistrosClientes">
            <div className="search">
              <select name="filtroCliente" onChange={valorSelectClientes}>
                <option value="nombre">Nombre</option>
                <option value="documento">Documento</option>
                <option value="celular">Celular</option>
                <option value="email">Email</option>
              </select>
              <input
                value={searchclientes}
                onChange={searchClientes}
                type="text"
                placeholder="Search Cliente"
              />
              <button className="btn btn-primary">
                <FontAwesomeIcon className="icon" icon={faMagnifyingGlass} />
              </button>
            </div>
            <hr />
            <table class="table mytable table-hover table-borderless">
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
                {resultsClientes.map((item, index) => (
                  <tr>
                    <td>{item.nombre}</td>
                    <td>{item.apellido}</td>
                    <td>{item.documento}</td>
                    <td>{item.celular}</td>
                    <td>{item.email}</td>
                    <td>{item.direccion}</td>
                    <td>
                      <button type="button" class="btn btn-secondary">
                        <FontAwesomeIcon
                          className="icon"
                          icon={faMagnifyingGlass}
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <Routes>
          <Route path="/dashboard" element={<DashboardAdmin />} />
          <Route path="/prestamos" element={<PrestamosAdministrador />} />
          <Route path="/solicitud" element={<Solicitudes />} />
        </Routes>
      </div>
    </div>
  );
};

export default DashboardAdmin;
