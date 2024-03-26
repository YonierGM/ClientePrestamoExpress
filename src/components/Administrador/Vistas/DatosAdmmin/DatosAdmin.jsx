import React, { useState } from "react";
import "./DatosAdmin.css";

import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

export const DatosAdmin = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [documento, setDocumento] = useState("");
  const [email, setEmail] = useState("");
  const [celular, setCelular] = useState("");
  const [administradorid, setAdministradorid] = useState(0);
  const [rolid, setRolid] = useState(2);

  // Función para validar que solo se ingresen letras en el nombre
  const handleNombreChange = (e) => {
    const value = e.target.value;
    // Verifica si el valor ingresado contiene solo letras
    if (/^[A-Za-z\s]+$/.test(value) || value === "") {
      setNombre(value);
    }
  };

  // Función para validar que solo se ingresen letras en el apellido
  const handleApellidoChange = (e) => {
    const value = e.target.value;
    // Verifica si el valor ingresado contiene solo letras
    if (/^[A-Za-z\s]+$/.test(value) || value === "") {
      setApellido(value);
    }
  };

  // Función para validar que solo se ingresen números en el documento
  const handleDocumentoChange = (e) => {
    const value = e.target.value;
    // Verifica si el valor ingresado contiene solo números
    if (/^[0-9]+$/.test(value) || value === "") {
      setDocumento(value);
    }
  };

  // Función para validar que solo se ingresen números en el celular
  const handleCelularChange = (e) => {
    const value = e.target.value;
    // Verifica si el valor ingresado contiene solo números
    if (/^[0-9]+$/.test(value) || value === "") {
      setCelular(value);
    }
  };

  const handleSubmit = async (e) => {
    Notiflix.Loading.standard();
    e.preventDefault();

    const data = {
      administradorid,
      nombre,
      apellido,
      documento,
      email,
      celular,
      rolid
    };

    try {
      const response = await fetch('http://localhost:8000/administradores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        Loading.remove();
        Notify.failure('Error al crear administrador');
        throw new Error('Error al crear administrador');
      }
      Loading.remove();
      Notify.success('Administrador creado exitosamente');
    } catch (error) {
      Loading.remove();
      console.error('Error al crear administrador:', error);
    }
  };

  return (
    <div className="DatosAdminContent">
    
      <div className="HomeDatosAdmin">
      
        <div className="formulario">
          <form onSubmit={handleSubmit} className="formularioAdmin">
            <div className="inputs">
              <input
                type="text"
                value={nombre}
                onChange={handleNombreChange}
                name="nombre"
                placeholder="Ingrese el nombre"
                required
              />
              <input
                type="text"
                value={apellido}
                onChange={handleApellidoChange}
                name="apellido"
                placeholder="Ingrese el apellido"
                required
              />
              <input
                type="text"
                value={documento}
                onChange={handleDocumentoChange}
                name="documento"
                placeholder="Ingrese el documento"
                required
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                placeholder="Ingrese el email"
                required
              />
              <input
                type="text"
                value={celular}
                onChange={handleCelularChange}
                name="celular"
                placeholder="Ingrese el celular"
                required
              />
            </div>
            <div className="buttom">
              <button className="save" type="submit">Save</button>
            </div>
          </form>
        </div>
        <div className="aside">
          <img src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
        </div>
      </div>
    </div>
  );
};

export default DatosAdmin;
