import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import "./Registrar.css";
import Header from "../Header";

import Notiflix from "notiflix";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { Confirm } from "notiflix/build/notiflix-confirm-aio";
import { useNavigate } from "react-router-dom";

const Registrar = () => {
  const navigate = useNavigate();

  const { clienteId } = useParams();
  const [error, setError] = useState(null);

  const [clientes, setCliente] = useState([]);

  const [rolid, setRolid] = useState(1);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [documento, setDocumento] = useState("");
  const [fecha_nac, setFecha_nac] = useState("");
  const [direccion, setDireccion] = useState("");
  const [celular, setCelular] = useState("");
  const [email, setEmail] = useState("");
  const [clienteid, setClienteid] = useState(0);

  const dataNew = {
    rolid,
    nombre,
    apellido,
    documento,
    fecha_nac,
    direccion,
    celular,
    email,
    clienteid,
  };

  useEffect(() => {
    fetchCliente();
  }, []);

  const fetchCliente = async () => {
    try {
      const response = await fetch("http://localhost:8000/clientes");
      if (!response.ok) {
        throw new Error("Failed to fetch loan types");
      }
      const data = await response.json();
      setCliente(data);
    } catch (error) {
      console.error("Error fetching loan types:", error);
    }
  };

  useEffect(() => {
    if (clienteId) {
      Notiflix.Loading.standard();
      fetch(`http://localhost:8000/clientes/${clienteId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch loan details");
          }
          return response.json();
        })
        .then((data) => {
          setNombre(data.nombre);
          setApellido(data.apellido);
          setDocumento(data.documento);
          setFecha_nac(data.fecha_nac);
          setDireccion(data.direccion);
          setCelular(data.celular);
          setEmail(data.email);
          setRolid(data.rolid);
          setClienteid(data.clienteid);
        })
        .catch((error) => {
          setError("Error fetching loan details:", error);
        })
        .finally(() => {
          Notiflix.Loading.remove();
        })
        .catch((error) => {
          setError("Error fetching loan details:", error);
        })
        .finally(() => {
          Notiflix.Loading.remove();
        });
    }
  }, [clienteId]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    Notiflix.Loading.standard();
    try {
      const url = clienteId
        ? `http://localhost:8000/clientes/${clienteId}`
        : "http://localhost:8000/clientes"; // URL diferente para creación y edición
      const method = clienteId ? "PUT" : "POST"; // Método diferente para creación y edición
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataNew),
      });
      if (!response.ok) {
        throw new Error("Failed to submit the form");
      }
      Notify.success("Cliente guardado exitosamente");
      navigate(`/`);
    } catch (error) {
      console.error("Error submitting the form:", error);
      Notify.failure("Error al guardar el Cliente");
    } finally {
      Notiflix.Loading.remove();
    }
  };

  const handleReturn = (e) => {
    e.preventDefault();
    Confirm.show(
      "Volver",
      "¿Desea volver al listado de clientes?",
      "Sí",
      "Cancelar",
      () => {
        navigate(`/administrador/dashboard/clientes`);
      },
      () => {
        console.log("Cancelado");
      }
    );
  };

  return (
    <div>
      <div className="homeContent">
        <div className="headerInicio">{<Header />}</div>
      </div>
      <div className="registro template d-flex justify-content-center align-items-center vh-100 bg-blue-800 text-white">
        <div className="form_container2 p-6 rounded">
          <form class="row g-3 " onSubmit={handleFormSubmit}>
            <h3 className="text-center">Crear Nueva Cuenta</h3>
            <div className="col-md-6">
              <label htmlFor="text">Nombre</label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                name="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ingrese el nombre" required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="text">Apellido</label>
              <input
                  type="text"
                  className="form-control"
                  id="apellido"
                  name="apellido"
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                  placeholder="Ingrese el apellido" required
                />

            </div>
            <div className="col-md-6">
              <label htmlFor="text">C.C:</label>
              <input
                  type="number"
                  className="form-control"
                  id="documento"
                  name="documento"
                  value={documento}
                  onChange={(e) => setDocumento(e.target.value)}
                  placeholder="Número de documento" required
                />
            </div>
            <div className="col-md-6">
            <label htmlFor="fecha_nac">fecha nacimiento</label>
                <input
                  type="date"
                  className="form-control"
                  id="fecha_nac"
                  name="fecha_nac"
                  value={fecha_nac}
                  onChange={(e) => setFecha_nac(e.target.value)}
                  required
                />
            </div>
            <div className="col-md-6">
            <label htmlFor="direccion">Direccion</label>
                <input
                  type="text"
                  className="form-control"
                  id="direccion"
                  name="direccion"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  placeholder="Ingrese la dirección" required
                />
            </div>
            <div className="col-md-6">
            <label htmlFor="celular">celular</label>
                <input
                  type="text"
                  className="form-control"
                  id="celular"
                  name="celular"
                  value={celular}
                  onChange={(e) => setCelular(e.target.value)}
                  placeholder="Número de celular" required
                />
            </div>
            <div className="col-md-6">
            <label htmlFor="email">email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ingrese el email" required
                />
            </div>

            <div className="d-flex justify-content-center mt-4">
            <button type="submit" className="btn btn-primary">Guardar</button>
            </div>
            <p className="text-end mt-4">
              ¿Ya tiene una cuenta? -
              <Link to="/IniciarSesion" className="ms-2 textInf">
                Iniciar Sesión
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registrar;
