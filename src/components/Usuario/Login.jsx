import { data } from "browserslist";
import React, { useState, useEffect } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import Home from "../PagInicio/Home";

const Login = () => {
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

  function ComponenteHermanoA({ datoCompartido, actualizarDato }) {
    const handleClick = () => {
      actualizarDato(usuario);
    };
  }


  useEffect(() => {
    fetchRoles();
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

  const handleSelectChangeRol = (e) => {
    const selectedTipoPrestamo = e.target.value;
    setRolid(selectedTipoPrestamo);
  };

  const handleSubmit = async (e) => {
    console.log("eentra");
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
      setUsuario(data.usuarioid)

      console.log(response);
      if (data.rolid === 1) {
        const handleEditClick = (usuario) => {
          navigate(`/usuario/${usuario}`);
          setUsuario(data.usuarioid)
          ComponenteHermanoA();
        };
        handleEditClick(data.usuarioid);

        navigate(`/usuario/${data.usuarioid}`);
      } else if (data.rolid === 2) {
        navigate("/administrador/dashboard");
      }
    } else if (response.status === 401) {
      // Unauthorized: incorrect password
      console.log("Incorrect password");
    } else if (response.status === 403) {
      // Forbidden: incorrect role
      console.log("Incorrect role");
    } else if (response.status === 404) {
      // Not Found: user not found
      console.log("User not found");
    } else {
      // Other errors
      console.log("Error:", response.status);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
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

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
