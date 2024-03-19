// import React from "react";
import React, { useState, useEffect } from "react";

import "./HistorialUsuario.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.min.js";

import { HeaderUsuario } from "../HeaderUsuario/HeaderUsuario";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export const HistorialUsuario = () => {
  //setear los hooks useState
  const [prestamos, setPrestamos] = useState([]);
  const [search, setSearch] = useState("");
  const [select, setSelect] = useState("estadoPago");

  const showData = () => {
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
      {
        fechaPrestamo: "2022-01-21",
        fechaPago: "2023-01-21",
        monto: 8000000,
        cantCuotas: 4,
        valorCuota: 2000000,
        cliente: "Juan Pereira",
        estadoPago: "Activo",
        tipoPrestamo: "Gold",
      },
    ];

    setPrestamos(Prestamos);
  };

  //función de búsqueda
  const searcher = (e) => {
    setSearch(e.target.value);
  };

  let filtro = "";

  const valorSelect = (e) => {
    setSelect(e.target.value);
    filtro = e.target.value;
    console.log(filtro);
  };

  //metodo de filtrado 2
  const results = prestamos.filter((dato) => {
    if (select && select !== "" && dato[select]) {
      return dato[select].toLowerCase().includes(search.toLowerCase());
    }
    return true;
  });
  useEffect(() => {
    showData();
  }, []);

  function contarPrestamosActivos(prestamos) {
    let contador = 0;
    for (const prestamo of prestamos) {
      if (prestamo.estadoPago === "Activo") {
        contador++;
      }
    }
    return contador;
  }

  function contarPrestamosPendientes(prestamos) {
    let contador = 0;
    for (const prestamo of prestamos) {
      if (prestamo.estadoPago === "Pendiente") {
        contador++;
      }
    }
    return contador;
  }

  function contarPrestamosPagos(prestamos) {
    let contador = 0;
    for (const prestamo of prestamos) {
      if (prestamo.estadoPago === "pago") {
        contador++;
      }
    }
    return contador;
  }

  const cantidadPrestamosActivos = contarPrestamosActivos(prestamos);
  const cantidadPrestamosPendientes = contarPrestamosPendientes(prestamos);
  const cantidadPrestamosPagos = contarPrestamosPagos(prestamos);

  return (
    <div className="UserContent">
      <div className="header">{<HeaderUsuario />}</div>
      <div className="UserContent-main">
        <div className="resumen">
          {/* <div className="header">
              <h2>Resumen</h2>
            </div> */}
          <div className="items">
            <div className="item">
              <p className="cantidad">{prestamos.length}</p>
              <p className="referencia">Registrados</p>
            </div>
            <div className="item">
              <p className="cantidad">{cantidadPrestamosPendientes}</p>
              <p className="referencia">Pendientes</p>
            </div>
            <div className="item">
              <p className="cantidad">{cantidadPrestamosActivos}</p>
              <p className="referencia">activos</p>
            </div>
            <div className="item">
              <p className="cantidad">{cantidadPrestamosPagos}</p>
              <p className="referencia">Pagados</p>
            </div>
          </div>
        </div>
        <div className="Registros RegistrosPrestamos">
          <div className="search">

            <select name="filtro" id="" onChange={valorSelect}>
              <option value="estadoPago">estado del pago</option>
              <option value="fechaPago">Fecha Pago</option>
              <option value="fechaPrestamo">Fecha Prestamo</option>
              <option value="tipoPrestamo">Tipo prestamo</option>
            </select>
            
            <input
              value={search}
              onChange={searcher}
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
                <th>Monto</th>
                <th>Fecha Prestamo</th>
                <th>Fecha Pago</th>
                <th>Estado Pago</th>
                <th>Tipo</th>
              </tr>
            </thead>
            <tbody>
              {results.map((item, index) => (
                <tr>
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
          {results.length < 1 ? "No hay conincidencias" : ""}
        </div>
        
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#5964D9"
          fill-opacity="1"
          d="M0,192L24,202.7C48,213,96,235,144,218.7C192,203,240,149,288,106.7C336,64,384,32,432,42.7C480,53,528,107,576,117.3C624,128,672,96,720,112C768,128,816,192,864,218.7C912,245,960,235,1008,213.3C1056,192,1104,160,1152,138.7C1200,117,1248,107,1296,133.3C1344,160,1392,224,1416,256L1440,288L1440,320L1416,320C1392,320,1344,320,1296,320C1248,320,1200,320,1152,320C1104,320,1056,320,1008,320C960,320,912,320,864,320C816,320,768,320,720,320C672,320,624,320,576,320C528,320,480,320,432,320C384,320,336,320,288,320C240,320,192,320,144,320C96,320,48,320,24,320L0,320Z"
        ></path>
      </svg>
      </div>
    </div>
  );
};

export default HistorialUsuario;
