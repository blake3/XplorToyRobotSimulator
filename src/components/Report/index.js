import React from 'react';

import './Report.styles.css';

class Report extends React.Component {

  render() {
    const { report } = this.props;

    return (
      <div className="report">
        <span className="robot-position">{report}</span>
      </div>
    );
  }
}

export default Report;