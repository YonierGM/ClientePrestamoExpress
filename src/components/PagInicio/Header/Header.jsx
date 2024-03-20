import React from "react";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import HeaderContent from "./HeaderContent"

const Header = () => {
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" className="text-white" style={{ backgroundColor: '#263aa9'}}>
                <Container>
                    <Navbar.Brand href="#home" style={{color: 'white'}}>PrestamosExpress</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            
                        </Nav>
                        <Nav>
                            <Nav.Link href="#inicio" style={{color: 'white'}}>Inicio</Nav.Link>
                            <Nav.Link ><p className="text-white">|</p></Nav.Link>
                            <Nav.Link href="#prestamos" style={{color: 'white'}}>Préstamos</Nav.Link>
                            <Nav.Link ><p className="text-white">|</p></Nav.Link>
                            <Nav.Link href="#iniciarSesion" style={{color: 'white'}}>Iniciar sesión</Nav.Link>
                            <Nav.Link ><p className="text-white">|</p></Nav.Link>
                            <Nav.Link eventKey={2} href="#resgistrarse" style={{color: 'white'}}>
                                Registrarse
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            
            <div className="headerContent">{<HeaderContent/>}</div>
        </div>
        
    )
}

export default Header