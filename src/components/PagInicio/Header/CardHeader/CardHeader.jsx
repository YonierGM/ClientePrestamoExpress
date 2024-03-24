import React from 'react';
import Card from 'react-bootstrap/Card';
import logo from '../../../../assets/logo-banco.png';
import "./CardHeader.css"

const CardHeader = () => {
  return (
    <div className='containerCards d-flex space-x-40'>
        <Card className="rounded-circle" style={{ width: '18rem', borderRadius: '40%', overflow: 'hidden' }}>
            <Card.Img variant="top" src={logo} />
        </Card>
        <Card className="bg-transparent" style={{ width: '40rem', border:'1px solid' }}>
            <Card.Body>
                <Card.Title className='text-white'>Card Title</Card.Title>
                <Card.Text >
                  Some quick example text to build on the card title and make up the
                  bulk of the card's content.
                </Card.Text>
            </Card.Body>
        </Card>
    </div>
  );
}

export default CardHeader