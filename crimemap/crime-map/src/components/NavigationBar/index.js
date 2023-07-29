import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const NavigationBar = () => {
  return (
    <>
        <Navbar bg="primary" data-bs-theme="dark">
          <Container>
              <Navbar.Brand href="/">Crime Map</Navbar.Brand>
              <Nav className="me-auto">
              <Nav.Link href="/">View Incidents</Nav.Link>
              <Nav.Link href="/update">Update Incidents</Nav.Link>
              <Nav.Link href="/query1">Areas With Crime Affecting Age</Nav.Link>
              <Nav.Link href="/query2">Ethnic Background vs Crime</Nav.Link>
              </Nav>
          </Container>
        </Navbar>
    </>
  )
}

export default NavigationBar