// import hook
import React, { useEffect, useState } from 'react';

import NavbarAdmin from '../components/NavbarAdmin';

// import components here
import { Container, Row, Col } from 'react-bootstrap';
import Contact from '../components/complain/Contact';

// import socket.io-client
import { io } from 'socket.io-client';

// initial variable outside socket
let socket;
export default function ComplainAdmin() {
  const [contact, setContact] = useState(null);
  const [contacts, setContacts] = useState([]);
  // code here

  const title = 'Complain admin';
  document.title = 'DumbMerch | ' + title;

  useEffect(() => {
    socket = io('http://localhost:5000');
    // code here
    loadContact();

    return () => {
      socket.disconnect();
    };
  }, []);

  const loadContact = () => {
    socket.emit('load customer contact');

    socket.on('customer contact', (data) => {
      console.log(data);

      const dataContact = data.map((item) => ({
        ...item,
        message: 'Click here to start message',
      }));

      setContacts(dataContact);
    });
  };

  const onClickContact = (data) => {
    setContact(data);
  };

  return (
    <>
      <NavbarAdmin title={title} />
      <Container fluid style={{ height: '89.5vh' }}>
        <Row>
          <Col
            md={3}
            style={{ height: '89.5vh' }}
            className="px-3 border-end border-dark overflow-auto"
          >
            <Contact
              dataContact={contacts}
              clickContact={onClickContact}
              contact={contact}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}
