import React, {useState,useEffect} from "react";
import axios from "axios";
import './css/deudausuario.css'
import telefono from "./img/llamada-telefonica.png"
import email from "./img/correo-electronico-vacio.png"
import ubicacion from "./img/ubicacion.png"
const Formulario = (Props) =>
{
    //Peticiones Get
    const [roles, setRoles] = useState(null);
    const urlroles = "http://127.0.0.1:8000/roles";
    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(urlroles);
                setRoles(response.data);
            } catch (e) {
                console.error("Error fetching data: ", e);
            }
        })();
    }, []);
    //peticiones post
    
    const guadardatosform = (data) =>
    {
        const urldata ='http://127.0.0.1:8000/prestamo'
        axios.post(urldata,data)
    }

    //Funciones
    const obtenerFechaActual = () => {
        const fechaActual = new Date();
        const dia = String(fechaActual.getDate()).padStart(2, '0'); // Obtén el día y agrega un 0 si es necesario para que tenga dos dígitos
        const mes = String(fechaActual.getMonth() + 1).padStart(2, '0'); // Obtén el mes y agrega un 0 si es necesario para que tenga dos dígitos
        const año = fechaActual.getFullYear(); // Obtiene el año (cuatro dígitos)
    
        return `${año}-${mes}-${dia}`;
    };
    const obtenerFechaFinal = () => {
        const fechaActual = new Date();
        const dia = String(fechaActual.getDate()).padStart(2, '0'); // Obtén el día y agrega un 0 si es necesario para que tenga dos dígitos
        const mes = String(fechaActual.getMonth() + 1).padStart(2, '0'); // Obtén el mes y agrega un 0 si es necesario para que tenga dos dígitos
        const año = fechaActual.getFullYear(); // Obtiene el año (cuatro dígitos)
    
        return `${año}-${mes}-${dia}`;
    };
    const [formData, setFormData] = useState({
        idcliente: Props.id,
        tipoPrestamo: '1',
        monto: '',
        cuotas: '',
        valorcuota: '',
        fechaPrestamo: obtenerFechaActual(),
        fechaestimadapago: ''
    })
    const seleccionadorOpciones = (e) => {
        const { id, value } = e.target;
        const selectedOption = e.target.options[e.target.selectedIndex];
        const key = selectedOption.getAttribute('data-key');
        
        setFormData(prevState => ({
            ...prevState,
            [id]: value, // Actualiza el valor de tipoPrestamo con el valor del select
            tipoPrestamo: key // Además, podrías almacenar el valor de data-key en otro campo, si lo necesitas
        }));
    };

    const CambioTexto = (e) => {
        const { id, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleSubmit = async (e) => {
        formData.valorcuota = Math.ceil(parseInt(formData.monto) / parseInt(formData.cuotas));
        formData.fechaestimadapago = obtenerFechaFinal()
        console.log(formData)
        guadardatosform(formData);
    };

    if (roles === null) {
        return <p>Elementos</p>;
      }
    return(
    <div className="m-4 d-flex justify-content-center  row bg-info p-4 rounded h-75">
            <div className="col-6 ">
                <h5>PrestamoExpress</h5>  
                <h1> Solicita tu prestamo</h1>
                <p><strong>Préstamos rápidos y confiables:</strong> <br/> solicita ahora y obtén el dinero que necesitas sin complicaciones.</p>
                <div className="d-flex  align-items-center mt-4"> 
                    <img src={telefono}  className="iconosUsuario border rounded-circle bg-warning" />
                    <p className="PerfilNombre "> 000-000-0000</p>
                </div>
                <div className="d-flex  align-items-center  mt-3"> 
                    <img src={email}  className="iconosUsuario border rounded-circle bg-warning" />
                    <p className="PerfilNombre "> PrestamoExpress@pexpress.com</p>
                </div>
                <div className="d-flex  align-items-center  mt-3"> 
                    <img src={ubicacion}  className="iconosUsuario border rounded-circle bg-warning" />
                    <p className="PerfilNombre "> Colombia</p>
                </div>
            </div>
        
        <div className="col-6 mt-4">
            <form className="card p-4 bg-primary" onSubmit={handleSubmit}>
                <label htmlFor="tipoPrestamo" className="form-label text-light">Tipos de Préstamos</label>
                <select id="tipoPrestamo" className="form-select" aria-label="Default select example" onChange={seleccionadorOpciones} >
                    {
                        roles['Roles'].map((item, index) => (
                            <option key={item.tipoprestamoid} data-key={item.tipoprestamoid}>{item.descripcion}</option>
                        ))
                    }
                </select>
                <label htmlFor="monto" className="form-label text-light">Ingrese la cantidad del préstamo</label>
                <input type="number" min={0} className="form-control" id="monto" onChange={CambioTexto} value={formData.monto}></input>
                <label htmlFor="cuotas" className="form-label text-light">Ingrese a cuantas cuotas lo vas a pagar</label>
                <input type="number" min={0} max={12} className="form-control" id="cuotas" onChange={CambioTexto} value={formData.cuotas}></input>
                <button className="mt-4 btn btn-info">Enviar Solicitud</button>
            </form>   
        </div>
        
    </div>
    )  
}

export default Formulario