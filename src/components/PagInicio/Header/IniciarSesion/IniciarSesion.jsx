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

    if (rolid == 1) {
      const response = await fetch(
        `http://localhost:8000/login_cliente?username=${encodeURIComponent(
          username
        )}&passw=${encodeURIComponent(passw)}`
      );
      if (response.ok) {
        const data = await response.json();
        const id = data.clienteid;

        console.log(data);

        navigate(`/usuario/${id}`);

        Notify.success("Bienvenido");
        Loading.remove();
     
      } else {
        Loading.remove();
        Notify.failure("Datos incorrectos");
        console.log("Incorrect");
      }
    }else if(rolid == 2){
      const response = await fetch(
        `http://localhost:8000/login_admin?username=${encodeURIComponent(
          username
        )}&passw=${encodeURIComponent(passw)}`
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);

        navigate("/administrador/dashboard/prestamos");
        Notify.success("Bienvenido");
        Loading.remove();
        
      } else {
        Loading.remove();
        Notify.failure("Datos incorrectos");
        console.log("Incorrect");
      }

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
                <option value="">Rol</option>
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
