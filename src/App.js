import React from 'react';

import { Card, Col, Container, Row } from 'reactstrap';
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
          <Card className="content">
              <Instructions />
          </Card>
        </Col>
        <Col>
          <Card className="content">
            <RobotSimulator />
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
