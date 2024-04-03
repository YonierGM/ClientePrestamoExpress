import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./FormularioPrestamos.css";

import Notiflix from "notiflix";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { Confirm } from "notiflix/build/notiflix-confirm-aio";
import { useNavigate } from "react-router-dom";

export const FormularioPrestamos = () => {
  const navigate = useNavigate();
  
  const { prestamoId } = useParams();
  const [error, setError] = useState(null);

  const [estadosPrestamo, setEstadoPrestamo] = useState([]);
  const [tiposPrestamo, setTiposPrestamo] = useState([]);
  const [clientes, setCliente] = useState([]);

  const [fechaprestamo, setFechaprestamo] = useState("");
  const [fechaestimadapago, setFechaestimadapago] = useState("");
  const [monto, setMonto] = useState("");
  const [cuotas, setCuotas] = useState("");
  const [valorcuota, setValorcuota] = useState("");
  const [estadoid, setEstadoid] = useState("");
  const [tipoprestamoid, setTipoprestamoid] = useState("");
  const [prestamoid, setPrestamoid] = useState(0);
  const [clienteid, setClienteid] = useState("");


  // const [prestamo, setPrestamo] = useState({
  //   fechaprestamo: "",
  //   fechaestimadapago: "",
  //   monto: "",
  //   cuotas: "",
  //   valorcuota: "",
  //   clienteid: "",
  //   estadoid: "",
  //   tipoprestamoid: "",
  //   prestamoid: "",
  // });

  const dataNew = {
    fechaprestamo,
    fechaestimadapago,
    monto,
    cuotas,
    valorcuota,
    estadoid,
    tipoprestamoid,
    prestamoid,
    clienteid
  }

  useEffect(() => {
    fetchTiposPrestamo();
    fetchEstadosPrestamo();
    fetchCliente();
  }, []);

  const fetchTiposPrestamo = async () => {
    try {
      const response = await fetch("http://localhost:8000/tiposprestamo");
      if (!response.ok) {
        throw new Error("Failed to fetch loan types");
      }
      const data = await response.json();
      setTiposPrestamo(data);
    } catch (error) {
      console.error("Error fetching loan types:", error);
    }
  };
  const handleSelectChangeTipo = (e) => {
    const selectedTipoPrestamo = e.target.value;
    setTipoprestamoid(selectedTipoPrestamo);
  };

  const fetchEstadosPrestamo = async () => {
    try {
      const response = await fetch("http://localhost:8000/estados-prestamo");
      if (!response.ok) {
        throw new Error("Failed to fetch loan types");
      }
      const data = await response.json();
      setEstadoPrestamo(data);
    } catch (error) {
      console.error("Error fetching loan types:", error);
    }
  };
  const handleSelectChangeEstado = (e) => {
    const selectedEstadoPrestamo = e.target.value;
    setEstadoid(selectedEstadoPrestamo);
  };

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
  const handleSelectChangeCliente = (e) => {
    const selectedClienteId = e.target.value;
    setClienteid(selectedClienteId);

    console.log(selectedClienteId)
  };

  useEffect(() => {
    if (prestamoId) {
      Notiflix.Loading.standard();
      fetch(`http://localhost:8000/prestamos/${prestamoId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch loan details");
          }
          return response.json();
        })
        .then((data) => {
          
          console.log(data)
          
          setFechaprestamo(data.fechaprestamo);
          setFechaestimadapago(data.fechaestimadapago);
          setMonto(data.monto);
          setCuotas(data.cuotas);
          setValorcuota(data.valorcuota);
          setEstadoid(data.estadoid);
          setTipoprestamoid(data.tipoprestamoid);
          setPrestamoid(data.prestamoid);
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
  }, [prestamoId]);

  const handleFormSubmit = async (e) => {

    console.log(dataNew)
    e.preventDefault();
    Notiflix.Loading.standard();
    try {
      const url = prestamoId
        ? `http://localhost:8000/prestamos/${prestamoId}`
        : "http://localhost:8000/prestamos"; // URL diferente para creación y edición
      const method = prestamoId ? "PUT" : "POST"; // Método diferente para creación y edición
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
      Notify.success("Prestamo guardado exitosamente");
      navigate(`/administrador/dashboard/prestamos`);
    } catch (error) {
      console.error("Error submitting the form:", error);
      Notify.failure("Error al guardar el prestamo");
    } finally {
      Notiflix.Loading.remove();
    }
  };

  const handleReturn = (e) => {
    e.preventDefault();
    Confirm.show(
      "Volver",
      "¿Desea volver al listado de prestamos?",
      "Sí",
      "Cancelar",
      () => {
        navigate(`/administrador/dashboard/prestamos`);
      },
      () => {
        console.log("Cancelado");
      }
    );
  };

  const handleFechaEstimadaPagoChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const currentDate = new Date();
    
    if (selectedDate <= currentDate) {
      // La fecha seleccionada es anterior o igual a la fecha actual
      // Aquí puedes mostrar un mensaje de error o realizar alguna acción apropiada
      // Por ejemplo, deshabilitar el botón de guardar o mostrar un mensaje al usuario
      console.log("La fecha estimada de pago debe ser posterior al día actual");
      Notify.failure("La fecha estimada de pago debe ser posterior al día actual");
      return;
    }
    
    // La fecha seleccionada es posterior a la fecha actual, puedes actualizar el estado
    setFechaestimadapago(e.target.value);
  };

  return (
    <div className="DatosAdminContent">
      <div className="HomeDatosAdmin">
        <div className="formulario">
          <form className="formularioAdmin" onSubmit={handleFormSubmit}>
            <div className="inputs">
              <div className="form-group">
                <label htmlFor="fechaprestamo">Fecha de Préstamo</label>
                <input
                  type="date"
                  className="form-control"
                  id="fechaprestamo"
                  name="fechaprestamo"
                  value={fechaprestamo}
                  onChange={(e) => setFechaprestamo(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="fechaestimadapago">
                  Fecha Estimada de Pago
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="fechaestimadapago"
                  name="fechaestimadapago"
                  value={fechaestimadapago}
                  onChange={handleFechaEstimadaPagoChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="monto">Monto</label>
                <input
                  type="text"
                  className="form-control"
                  id="monto"
                  name="monto"
                  value={monto}
                  onChange={(e) => setMonto(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="cuotas">Cuotas</label>
                <input
                  type="text"
                  className="form-control"
                  id="cuotas"
                  name="cuotas"
                  value={cuotas}
                  onChange={(e) => setCuotas(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="valorcuotas">Valor de Cuotas</label>
                <input
                  type="text"
                  className="form-control"
                  id="valorcuotas"
                  name="valorcuota"
                  value={valorcuota}
                  onChange={(e) => setValorcuota(e.target.value)}
                  required
                />
              </div>
              <select
                value={tipoprestamoid}
                onChange={(e) => handleSelectChangeTipo(e)}
                required
              >
                <option value="">Tipo del prestamo</option>
                {tiposPrestamo.map((tipo) => (
                  <option key={tipo.tipoprestamoid} value={tipo.tipoprestamoid}>
                    {tipo.tipoprestamoid} - {tipo.descripcion}
                  </option>
                ))}
              </select>

              <select
                value={estadoid}
                onChange={(e) => handleSelectChangeEstado(e)}
                required
              >
                <option value="">Estado del préstamo</option>
                {estadosPrestamo.map((estado) => (
                  <option key={estado.estadoid} value={estado.estadoid}>
                    {estado.estadoid} - {estado.descripcion}
                  </option>
                ))}
              </select>

              <select
                value={clienteid}
                onChange={(e) => handleSelectChangeCliente(e)}
                required
              >
                <option value="">Cliente</option>
                {clientes.map((cliente) => (
                  <option key={cliente.clienteid} value={cliente.clienteid}>
                    {cliente.clienteid} - {cliente.nombre} - CC - {cliente.documento}
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

export default FormularioPrestamos;
