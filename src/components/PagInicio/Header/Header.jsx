import React from "react";

import Container from 'react-bootstrap/Container';
import { Nav, Navbar } from 'react-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" className="text-white" style={{ backgroundColor: '#263aa9'}}>
                <Container>
                    <Navbar.Brand as={Link} to="/" style={{color: 'white'}}>PrestamosExpress</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            
                        </Nav>
                        <Nav>
                            <Nav.Link as={Link} to="/" style={{color: 'white'}}>
                                Inicio
                            </Nav.Link>
                            <Nav.Link ><p className="text-white">
                                </p></Nav.Link>
                            <Nav.Link ><p className="text-white"></p></Nav.Link>
                            <Nav.Link as={Link} to="/IniciarSesion" style={{color: 'white'}}>
                                Iniciar sesión</Nav.Link>
                            <Nav.Link ><p className="text-white"></p></Nav.Link>
                            <Nav.Link as={Link} to="/Registrar" style={{color: 'white'}}>
                                Registrar Cliente
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Header