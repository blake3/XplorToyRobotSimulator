import React from 'react';

import { FormFeedback, InputGroup, InputGroupAddon, Button, Input } from 'reactstrap';

import './CommandInput.styles.css'

class CommandInput extends React.Component {
  inputRef = null;

  handleKeyPress = event => {
    if (event.key == "Enter") {
      console.log('entered')
      this.props.submitCommand(event.target.value)
    }
  }

  render() {
    const { error, submitCommand } = this.props;
    const hasError = error !== "";
    return (
        <InputGroup className="command-input">
          <Input invalid={hasError} placeholder="Please enter a command" onKeyPress={this.handleKeyPress} ref={(ref) => {this.inputRef = ref}}/>
          <InputGroupAddon addonType="append">
            <Button variant="outline-primary" onClick={() => submitCommand(this.inputRef.value)}>Submit</Button>
          </InputGroupAddon>
          <FormFeedback>{error}</FormFeedback>
        </InputGroup>
    );

  }
}

export default CommandInput;