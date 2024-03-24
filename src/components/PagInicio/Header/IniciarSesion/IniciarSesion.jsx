import React from "react"
import imgEmail from '../../../../assets/email.png'
import imgPassword from '../../../../assets/password.png'
import imgPerson from '../../../../assets/person.png'
import './IniciarSesion.css'
import { Link } from "react-router-dom"

const IniciarSesion = () => {
    return (
        <div className="iniciarsesion template d-flex justify-content-center align-items-center vh-100 bg-blue-800">
            <div className="form_container p-5 rounded bg-white">
                <form>
                    <h3 className="text-center">Iniciar Sesión</h3>
                    <div className="mb-2">
                        <label htmlFor="text">Cédula</label>
                        <input type="text" placeholder="Ingrese su cédula" className="form-control"/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="email">Email</label>
                        <input type="email" placeholder="Ingrese su email" className="form-control"/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="password">Contraseña</label>
                        <input type="password" placeholder="Ingrese su contraseña" className="form-control"/>
                    </div>
                    <div className="mb-2">
                        <input type="checkbox" className="custom-control custom-checkbox" id="check" />
                        <label htmlFor="check" className="custom-input-label ms-2">
                            Recuerdame
                        </label>
                    </div>
                    <div className="d-grid">
                        <button className="btn btn-primary">Iniciar Sesión</button>
                    </div>
                    <p className="text-end mt-2">
                        ¿Olvidaste<a href="" className="text-blue-600"> tu contraseña?</a><Link to="/Registrar" className="ms-2 text-blue-600">Registrar</Link>
                    </p>
                </form>
            </div>
            
        </div>

    );
}

export default IniciarSesion;