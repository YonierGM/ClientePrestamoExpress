import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./FormularioUsuarios.css";

import Notiflix from "notiflix";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { Confirm } from "notiflix/build/notiflix-confirm-aio";
import { useNavigate } from "react-router-dom";

export const FormularioUsuarios = () => {
  const navigate = useNavigate();
  
  const { usuarioId } = useParams();
  const [error, setError] = useState(null);

  const [usuarios, setUsuarios] = useState([]);

  const [username, setUsername] = useState("");
  const [passw, setPassw] = useState("");
  const [usuarioid, setUsuarioid] = useState(0);
  const [rolid, setRolid] = useState("");

  const [roles, setRoles] = useState([]);

  const dataNew = {
    username,
    passw,
    usuarioid,
    rolid,
  }

  useEffect(() => {
    fetchUsuarios();
    fetchRoles()
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await fetch("http://localhost:8000/roles");
      if (!response.ok) {
        throw new Error("Failed to fetch loan types");
      }
      const data = await response.json();
      setRoles(data);
    } catch (error) {
      console.error("Error fetching loan types:", error);
    }
  };

  const fetchUsuarios = async () => {
    try {
      const response = await fetch("http://localhost:8000/usuarios");
      if (!response.ok) {
        throw new Error("Failed to fetch loan types");
      }
      const data = await response.json();
      setUsuarios(data);
    } catch (error) {
      console.error("Error fetching loan types:", error);
    }
  };

  useEffect(() => {
    if (usuarioId) {
      Notiflix.Loading.standard();
      fetch(`http://localhost:8000/usuarios/${usuarioId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch loan details");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data)
          
          setUsername(data.username);
          setPassw(data.passw);
          setRolid(data.rolid)
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
  }, [usuarioId]);

  const handleSelectChangeRol = (e) => {
    const selectedTipoPrestamo = e.target.value;
    setRolid(selectedTipoPrestamo);
  };

  const handleFormSubmit = async (e) => {

    console.log(dataNew)
    e.preventDefault();
    Notiflix.Loading.standard();
    try {
      const url = usuarioId
        ? `http://localhost:8000/usuarios/${usuarioId}`
        : "http://localhost:8000/usuarios"; // URL diferente para creación y edición
      const method = usuarioId ? "PUT" : "POST"; // Método diferente para creación y edición
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
      Notify.success("Usuarios guardado exitosamente");
      navigate(`/administrador/dashboard/usuarios`);
    } catch (error) {
      console.error("Error submitting the form:", error);
      Notify.failure("Error al guardar el usuario");
    } finally {
      Notiflix.Loading.remove();
    }
  };

  const handleReturn = (e) => {
    e.preventDefault();
    Confirm.show(
      "Volver",
      "¿Desea volver al listado de usuarios?",
      "Sí",
      "Cancelar",
      () => {
        navigate(`/administrador/dashboard/usuarios`);
      },
      () => {
        console.log("Cancelado");
      }
    );
  };

  return (
    <div className="DatosAdminContent">
      <div className="HomeDatosAdmin">
        <div className="formulario">
          <form className="formularioAdmin" onSubmit={handleFormSubmit}>
            <div className="inputs">
              <div className="form-group">
                <label htmlFor="username">Nombre de usuario</label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="passw">
                  Contraseña
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="passw"
                  value={passw}
                  onChange={(e) => setPassw(e.target.value)}
                  required
                />
              </div>

              <label htmlFor="">Rol del usuario</label>
              <select
                value={rolid}
                onChange={(e) => handleSelectChangeRol(e)}
                required
              >
                <option value="">Tipo del prestamo</option>
                {roles.map((rol) => (
                  <option key={rol.rolid} value={rol.rolid}>
                    {rol.rolid} - {rol.descripcion}
                  </option>
                ))}
              </select>

            </div>
            <div className="buttom">
              <button className="cancel" onClick={handleReturn}>
                Cancelar
              </button>
              <button type="submit">Guardar</button>
            </div>
          </form>
        </div>
        <div className="aside">
          <img
            src="https://cdn.pixabay.com/photo/2015/01/09/11/08/startup-594090_1280.jpg"
            alt="imagen aside"
          />
        </div>
      </div>
    </div>
  );
};

export default FormularioUsuarios;
