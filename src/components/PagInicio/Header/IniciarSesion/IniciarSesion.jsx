import React, { useState, useEffect } from "react";
import "./IniciarSesion.css";
import Header from "../Header";

import { useNavigate, Routes, Route, Link } from "react-router-dom";

import { Notify } from "notiflix/build/notiflix-notify-aio";

import { Loading } from "notiflix/build/notiflix-loading-aio";
import { Confirm } from "notiflix/build/notiflix-confirm-aio";

const IniciarSesion = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [passw, setPassw] = useState("");
  const [usuarioid, setUsuarioid] = useState(0);
  const [rolid, setRolid] = useState("");

  const [roles, setRoles] = useState([]);

  const [usuario, setUsuario] = useState();

  const dataNew = {
    username,
    passw,
    usuarioid,
    rolid,
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    Loading.standard();
    try {
      const response = await fetch("http://localhost:8000/roles");
      if (!response.ok) {
        throw new Error("Failed to fetch loan types");
      }
      const data = await response.json();
      setRoles(data);
      Loading.remove();
    } catch (error) {
      Loading.remove();
      console.error("Error fetching loan types:", error);
    }
  };

  const handleSelectChangeRol = (e) => {
    const selectedTipoPrestamo = e.target.value;
    setRolid(selectedTipoPrestamo);
  };

  const handleSubmit = async (e) => {
    Loading.standard();
    e.preventDefault();

    // Realizar la solicitud POST al endpoint de
    console.log(dataNew);
    const response = await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataNew),
    });

    if (response.ok) {
      const data = await response.json();
      setUsuario(data.usuarioid);

      console.log(response);
      if (data.rolid === 1) {
        console.log(data)
        Loading.remove();
        Notify.success('Bienvenido');
        navigate(`/usuario/${data.usuarioid}`);
      } else if (data.rolid === 2) {
        Loading.remove();
        Notify.success('Bienvenido Administrador');
        navigate("/administrador/dashboard/prestamos");
      }
    } else if (response.status === 401) {
        Loading.remove();
        Notify.failure('Contaseña Incorrecta');
      console.log("Incorrect password");
    } else if (response.status === 403) {
        Loading.remove();
        Notify.failure('Elija un rol válido');
      console.log("Incorrect role");
    } else if (response.status === 404) {
        Loading.remove();
        Notify.failure('El usuario no existe');
      console.log("User not found");
    } else {
        Loading.remove();
      // Other errors
      console.log("Error:", response.status);
    }
  };

  return (
    <div>
      <div className="homeContent">
        <div className="headerInicio">{<Header />}</div>
      </div>
      <div className="iniciarsesion template d-flex justify-content-center align-items-center vh-100 bg-blue-800 text-white">
        <div className="form_container p-6 rounded">
          <form onSubmit={handleSubmit}>
            <h3 className="text-center">Iniciar Sesión</h3>
            <div className="mb-2">
              <label>Nombre de usuario</label>

              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="form-control"
                placeholder="Ingrese su username"
              />
            </div>
            <div className="mb-2">
              <label htmlFor="email">Contraseña</label>
              <input
                type="password"
                id="password"
                value={passw}
                onChange={(e) => setPassw(e.target.value)}
                className="form-control"
                required
                placeholder="Ingrese su contraseña"
              />
            </div>
            <div className="mb-2">
              <label htmlFor="password">Rol</label>
              <select
                value={rolid}
                onChange={(e) => handleSelectChangeRol(e)}
                required
                className="form-control"
              >
                <option value="">Tipo del prestamo</option>
                {roles.map((rol) => (
                  <option key={rol.rolid} value={rol.rolid}>
                    {rol.rolid} - {rol.descripcion}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-2">
              <input
                type="checkbox"
                className="custom-control custom-checkbox"
                id="check"
              />
              <label htmlFor="check" className="custom-input-label ms-2">
                Recuerdame
              </label>
            </div>
            <div className="d-flex justify-content-center mt-4">
              <button type="submit" className="btn btn-primary">
                Iniciar Sesión
              </button>
            </div>
            <p className="text-end mt-4">
              ¿Olvidaste tu contraseña? -
              <Link to="/Registrar" className="ms-2 textInf">
                Registrar
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default IniciarSesion;
