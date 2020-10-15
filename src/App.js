import React from 'react';

import { Card, Col, Container, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import RobotSimulator from './components/RobotSimulator';
import Instructions from './components/Instructions';
import './App.css';

function App() {
  return (
    <Container>
      <Row>
        <h1 className="header">Toy Robot Simulator</h1>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Instructions />
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <RobotSimulator />
          </Card>
        </Col>
      </Row>
    </Container>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
