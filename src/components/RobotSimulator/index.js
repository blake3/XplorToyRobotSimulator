import React from 'react';

import { Card, Col } from 'react-bootstrap';

import CommandInput from '../CommandInput';

import './RobotSimulator.styles.scss';

class RobotSimulator extends React.Component {


  render() {
    return (
      <div>
        <CommandInput />
        
      </div>
    )
  }

}

export default RobotSimulator;