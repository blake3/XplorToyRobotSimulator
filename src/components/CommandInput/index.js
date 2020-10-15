import React from 'react';


class CommandInput extends React.Component {


  render() {
    return (
      <>
        {/* <label for="command-input">Please enter a command:</label> */}
        <input type="text" id="command-input" placeholder="Please enter a command"/>
      </>
    );

  }
}

export default CommandInput;