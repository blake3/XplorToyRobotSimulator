import React from 'react';
import { connect } from 'react-redux';

import CommandInput from '../CommandInput';
import { submitCommand } from '../../redux/reducer';

import './RobotSimulator.styles.css';

class RobotSimulator extends React.Component {


  render() {
    const {showReport, robotPosition, error, submitCommand } = this.props;
    return (
      <div>
        <CommandInput error={error} submitCommand={submitCommand}/>
        
      </div>
    )
  }

}

const mapStateToProps = state => ({
  showReport: state.showReport,
  robotPosition: state.robotPosition,
  error: state.error,
});

export default connect(mapStateToProps, {submitCommand})(RobotSimulator);