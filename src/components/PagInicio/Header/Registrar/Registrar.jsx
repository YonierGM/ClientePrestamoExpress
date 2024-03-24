import React from "react"
import imgEmail from '../../../../assets/email.png'
import imgPassword from '../../../../assets/password.png'
import imgPerson from '../../../../assets/person.png'
import './Registrar.css'
import { Link } from "react-router-dom"

const Registrar = () => {
    return (
        <div className="registro template d-flex justify-content-center align-items-center vh-100 bg-blue-800 text-white">
            <div className="form_container2 p-5 rounded">
                <form class="row g-3">
                    <h3 className="text-center">Crear Nueva Cuenta</h3>
                    <div className="col-md-6">
                        <label htmlFor="text">Nombre</label>
                        <input type="text" placeholder="Ingrese su nombre" className="form-control"/>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="text">Apellido</label>
                        <input type="text" placeholder="Ingrese su pellido" className="form-control"/>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="text">C.C:</label>
                        <input type="text" placeholder="Ingrese su cédula" className="form-control"/>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="email">Email</label>
                        <input type="email" placeholder="ejemplo@email.com" className="form-control"/>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="text">Celular</label>
                        <input type="text" placeholder="Ingrese su celular" className="form-control"/>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="text">Profesión</label>
                        <input type="text" placeholder="Indique su profesión" className="form-control"/>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="text">Ingresos mensuales</label>
                        <input type="text" placeholder="Indique su ingreso mensual" className="form-control"/>
                    </div>
                    
                    <div className="col-md-6">
                        <label htmlFor="password">Contraseña</label>
                        <input type="password" placeholder="Ingrese su contraseña" className="form-control"/>
                    </div>
                    <div className="col-12">
                        <button className="btn btn-primary">Crear Cuenta</button>
                    </div>
                    <p className="text-end mt-2">
                        ¿Ya tiene una cuenta? - <Link to="/IniciarSesion" className="textInf">Iniciar Sesión</Link>
                    </p>
                </form>
            </div>
            
        </div>
    )
}

export default Registrar