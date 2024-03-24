import React from "react"
import './IniciarSesion.css'
import Header from "../Header"
import { Link } from "react-router-dom"

const IniciarSesion = () => {
    return (
        <div>
            <div className="homeContent">
                <div className="headerInicio">{<Header />}</div>
            </div>
            <div className="iniciarsesion template d-flex justify-content-center align-items-center vh-100 bg-blue-800 text-white">
                <div className="form_container p-6 rounded">
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
                        <div className="d-flex justify-content-center mt-4">
                            <button className="btn btn-primary">Iniciar Sesión</button>
                        </div>
                        <p className="text-end mt-4">
                            ¿Olvidaste tu contraseña? -<Link to="/Registrar" className="ms-2 textInf">Registrar</Link>
                        </p>
                    </form>
                </div>
                
            </div>
        </div>

    );
}

export default IniciarSesion;