import React from 'react';

class Instructions extends React.Component {

  render() {
    const commands = [
      {
        name: "PLACE",
        explanation: "Puts the robot at position X,Y facing direction F (NORTH, SOUTH, EAST or WEST)"
      },
      {
        name: "MOVE",
        explanation: "Moves the toy robot one unit forward in the direction it is currently facing."
      },
      {
        name: "LEFT",
        explanation: "Rotates the robot 90 degrees to the left"
      },
      {
        name: "RIGHT",
        explanation: "Rotates the robot 90 degrees to the right"
      },
      {
        name: "REPORT",
        explanation: "Announces the X,Y and F of the robot"
      }
    ]
    return (
      <div>
        <p>
          Welcome to the Toy Robot Simulator!
          Your robot can move in a square of
          5 units by 5 units. You can control
          your robot with the following commands:
        </p>
        <ul>
          {commands.map(({name, explanation}) =>
            <li>
              <strong>{name}</strong>
              <p>{explanation}</p>
            </li>)}
        </ul>
      </div>
    )
  }
}

export default Instructions;