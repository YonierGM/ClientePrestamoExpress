import React from "react";
import Card from "react-bootstrap/Card";
import logo from "../../../../assets/logo-banco.png";
import "./CardMain.css";

const CardMain = () => {
  return (
    <div className="containerCards d-flex space-x-40">
      <Card
        className="rounded-circle"
        style={{ width: "18rem", borderRadius: "40%", overflow: "hidden" }}
      >
        <Card.Img variant="top" src={logo} />
      </Card>
      <Card
        className="bg-transparent"
        style={{ width: "40rem", border: "1px solid" }}
      >
        <Card.Body>
          <Card.Title className="text-white titulo">PrestamosExpress</Card.Title>
          <Card.Text>
            <p className="descripcion_web">
              "¡Consigue el dinero que necesitas ahora mismo con nuestros
              préstamos rápidos y flexibles! Sin complicaciones, sin papeleo
              interminable. 

              <br />
              <br />
              
              Solicita tu préstamo en línea y recibe una respuesta
              en minutos. ¡Haz realidad tus proyectos hoy con nuestra ayuda
              financiera confiable y transparente!"
            </p>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CardMain;
