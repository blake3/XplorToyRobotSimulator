import React from 'react';
import { connect } from 'react-redux';

import CommandInput from '../CommandInput';
import Report from '../Report';
import { submitCommand } from '../../redux/reducer';

import './RobotSimulator.styles.css';

class RobotSimulator extends React.Component {


  render() {
    const {report, error, submitCommand } = this.props;
    return (
      <div className="right-content">
        <CommandInput error={error} submitCommand={submitCommand}/>
        <Report report={report}/>
      </div>
    )
  }

}

const mapStateToProps = state => ({
  report: state.report,
  error: state.error,
});

export default connect(mapStateToProps, {submitCommand})(RobotSimulator);