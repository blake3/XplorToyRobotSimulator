import React from 'react';

import { FormFeedback, InputGroup, Input } from 'reactstrap';

import './CommandInput.styles.css'

class CommandInput extends React.Component {
  inputRef = null;

  handleKeyPress = event => {
    if (event.key === "Enter") {
      this.props.submitCommand(event.target.value)
    }
  }

  render() {
    const { error } = this.props;
    const hasError = error !== "";
    return (
      <div className="command-input">
        <InputGroup>
          <Input invalid={hasError} valid={!hasError && this.inputRef} placeholder="Enter a command and press Enter" onKeyPress={this.handleKeyPress} ref={(ref) => {this.inputRef = ref}}/>
          {hasError && <FormFeedback>{error}</FormFeedback>}
          {!hasError && <FormFeedback valid>Successfully processed robot command</FormFeedback>}
        </InputGroup>
        </div>
    );

  }
}

export default CommandInput;