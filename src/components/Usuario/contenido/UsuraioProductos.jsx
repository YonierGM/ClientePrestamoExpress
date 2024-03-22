import React ,{useState,useEffect}from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import axios from "axios";
const Productos = (Props) => { 

    const [formData, setFormData] = useState({
        prestamoid: '',
        monto: '',
        fechapago:'',
    });
    let repuesta = ''
    const [prestamo, setPrestamo] = useState(null);

    const urlprestamo = "http://127.0.0.1:8000/prestamo/" + Props.id;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responsePrestamo = await axios.get(urlprestamo);
                setPrestamo(responsePrestamo.data);
            } catch (e) {
                console.error("Error fetching data: ", e);
            }
        };
        fetchData();
    }, [urlprestamo]);

    useEffect(() => {
        if (prestamo) {
            const prestamoActivo = prestamo['prestamo'].find(item => item.estadoid === 1);
            if (prestamoActivo) {
                setFormData(prevState => ({
                    ...prevState,
                    prestamoid: prestamoActivo.prestamoid,
                }));
            }
        }
    }, [prestamo]);

    async function guadarPago(data)
    {
        const urlPago = 'http://127.0.0.1:8000/pago'
        repuesta = await axios.post(urlPago,data)
    }

    async function RevisarDeuda()
    {
        const urlPago = 'http://127.0.0.1:8000/revisarDeuda'
        let Datos = {
            "prestamoid": parseInt(prestamoActivo.prestamoid),
            "cliente": parseInt(Props.id)
          }
          console.log(Datos)
        repuesta = await axios.put(urlPago,Datos)
    }

    const obtenerFechaActual = () => {
        const fechaActual = new Date();
        const dia = String(fechaActual.getDate()).padStart(2, '0');
        const mes = String(fechaActual.getMonth() + 1).padStart(2, '0');
        const año = fechaActual.getFullYear();

        return `${año}-${mes}-${dia}`;
    };

    const cambioTexto = (e) => {
        const { id, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value,
            fechapago: obtenerFechaActual()
        }));
    };

    if (prestamo === null) {
        return (<>Cargando...</>);
    }

    const prestamoActivo = prestamo['prestamo'].find(item => item.estadoid === 1);
    RevisarDeuda()
    function submit(e)
    {
        console.log(formData)
        guadarPago(formData)
        RevisarDeuda()
    }
    
    if (prestamoActivo !== undefined) {
        return (
            <div className="w-100 h-75 d-flex justify-content-center align-items-center">
                <div className="col-6 mt-4">
                    <form className="card p-4 bg-primary text-light" onSubmit={submit}>
                        <h1 className=""> Pagar Prestamo </h1>
                        <h4 className="text-dark">Prestamo de {prestamoActivo.monto}</h4>
                        <h4 className="text-dark">Couta recomendada {prestamoActivo.valorcuota}</h4>
                        <label htmlFor="monto" className="form-label text-light">Ingrese el monto</label>
                        <input type="number" min={0} max={prestamoActivo.monto} className="form-control" id="monto" onChange={cambioTexto}></input>
                        <button className="mt-4 btn btn-info">Pagar</button>
                        <p className="text-ligth text-center">{repuesta}</p>
                    </form>   
                </div>
            </div>
        );
    } else {
        return (
            <div className="d-flex flex-column d-flex  align-items-center h-100">
                <h1 className="text-center border p-1 border-primary bg-primary rounded-pill col-12">¡En hora buena!</h1><br/> 
                <div className="d-flex flex-column mt-4 p-4 bg-informacion">
                    <h5>
                        Puedes solicitar un nuevo préstamo.<br/>
                        Presiona el botón aquí abajo.
                    </h5>
                    <Link to='/usuario/solicitudprestamo' className="btn btn-primary w-10"> Solicitar Préstamo</Link> 
                </div>
            </div>
        );
    }
};

export default Productos;