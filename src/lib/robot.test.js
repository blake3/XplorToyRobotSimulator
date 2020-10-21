import { Direction, Robot } from './robot';

/**
 * Helper function to check the robot state is correct.
 * @param {} robot Robot to be verified.
 * @param {*} expectedX Desired x value of the robot.
 * @param {*} expectedY Desired y value of the robot.
 * @param {*} expectedFacing Desired facing value of the robot.
 */
function checkRobotValues(robot, expectedIsPlaced, expectedX, expectedY, expectedFacing, ) {
    expect(robot.isPlaced).toBe(expectedIsPlaced);
    expect(robot.x).toBe(expectedX);
    expect(robot.y).toBe(expectedY);
    expect(robot.facing).toBe(expectedFacing);
}

test("can initialise robot", () => {
    const robot = new Robot();
    console.log(robot.blockedSquares);
    expect(robot.isPlaced).toBeFalsy();
    expect(Array.isArray(robot.blockedSquares)).toBeTruthy();
    expect(robot.blockedSquares.length).toBe(0);
});

test("cannot place robot with non-integer position", () => {
    // It has been assumed that only integer positions are allowed.
    const robot = new Robot();
    robot.place(0.3, 3, "NORTH");
    checkRobotValues(robot, false);

    robot.place(3, 0.1, "SOUTH");
    checkRobotValues(robot, false);

    robot.place("x pos", 3, "EAST");
    checkRobotValues(robot, false);

    robot.place(3, "y pos", "WEST");
    checkRobotValues(robot, false);
});

test("cannot place robot outside bounds", () => {
    const robot = new Robot();
    robot.place(-1, 0, "NORTH");
    checkRobotValues(robot, false);
    
    robot.place(1, -3, "EAST");
    checkRobotValues(robot, false);
    
    robot.place(5, 0, "NORTH");
    checkRobotValues(robot, false);
    
    robot.place(1, 10, "NORTH");
    checkRobotValues(robot, false);
});

test("can place robot in valid position", () => {
    const robotN = new Robot();
    robotN.place(2, 3, "NORTH");
    checkRobotValues(robotN, true, 2, 3, Direction.NORTH);

    const robotE = new Robot();
    robotE.place(0, 4, "EAST");
    checkRobotValues(robotE, true, 0, 4, Direction.EAST);

    const robotS = new Robot();
    robotS.place(4, 4, "SOUTH");
    checkRobotValues(robotS, true, 4, 4, Direction.SOUTH);

    const robotW = new Robot();
    robotW.place(3, 2, "WEST");
    checkRobotValues(robotW, true, 3, 2, Direction.WEST);
});

test("cannot move robot outside bounds", () => {
    for (var x = 0; x < 5; x++) {
        const robotN = new Robot();
        robotN.place(x, 4, "NORTH");
        robotN.move();
        checkRobotValues(robotN, true, x, 4, Direction.NORTH);

        const robotS = new Robot();
        robotS.place(x, 0, "SOUTH");
        robotS.move();
        checkRobotValues(robotS, true, x, 0, Direction.SOUTH);
    }

    for (var y = 0; y < 5; y++) {
        const robotE = new Robot();
        robotE.place(4, y, "EAST");
        robotE.move();
        checkRobotValues(robotE, true, 4, y, Direction.EAST);

        const robotW = new Robot();
        robotW.place(0, y, "WEST");
        robotW.move();
        checkRobotValues(robotW, true, 0, y, Direction.WEST);
    }
});

test("can move robot within bounds", () => {
    for (var x = 0; x < 4; x++) {
        const robotE = new Robot();
        robotE.place(x, 2, "EAST");
        robotE.move();
        checkRobotValues(robotE, true, x + 1, 2, Direction.EAST);
    }

    for (var x = 1; x < 5; x++) {
        const robotW = new Robot();
        robotW.place(x, 4, "WEST");
        robotW.move();
        checkRobotValues(robotW, true, x - 1, 4, Direction.WEST);
    }

    for (var y = 0; y < 4; y++) {
        const robotN = new Robot();
        robotN.place(1, y, "NORTH");
        robotN.move();
        checkRobotValues(robotN, true, 1, y + 1, Direction.NORTH);
    }

    for (var y = 1; y < 5; y++) {
        const robotS = new Robot();
        robotS.place(3, y, "SOUTH");
        robotS.move();
        checkRobotValues(robotS, true, 3, y - 1, Direction.SOUTH);
    }
});

test("can rotate robot to the right", () => {
    const robotN = new Robot();
    robotN.place(2, 2, "NORTH");
    robotN.rotateRight();
    checkRobotValues(robotN, true, 2, 2, Direction.EAST);

    const robotE = new Robot();
    robotE.place(3, 4, "EAST");
    robotE.rotateRight();
    checkRobotValues(robotE, true, 3, 4, Direction.SOUTH);

    const robotS = new Robot();
    robotS.place(1, 2, "SOUTH");
    robotS.rotateRight();
    checkRobotValues(robotS, true, 1, 2, Direction.WEST);

    const robotW = new Robot();
    robotW.place(4, 2, "WEST");
    robotW.rotateRight();
    checkRobotValues(robotW, true, 4, 2, Direction.NORTH);
    robotW.rotateRight();
    checkRobotValues(robotW, true, 4, 2, Direction.EAST);
});

test("can rotate robot to the left", () => {
    const robotN = new Robot();
    robotN.place(0, 0, "NORTH");
    robotN.rotateLeft();
    checkRobotValues(robotN, true, 0, 0, Direction.WEST);

    const robotW = new Robot();
    robotW.place(1, 4, "WEST");
    robotW.rotateLeft();
    checkRobotValues(robotW, true, 1, 4, Direction.SOUTH);

    const robotS = new Robot();
    robotS.place(3, 3, "SOUTH");
    robotS.rotateLeft();
    checkRobotValues(robotS, true, 3, 3, Direction.EAST);

    const robotE = new Robot();
    robotE.place(4, 2, "EAST");
    robotE.rotateLeft();
    checkRobotValues(robotE, true, 4, 2, Direction.NORTH);
    robotE.rotateLeft();
    checkRobotValues(robotE, true, 4, 2, Direction.WEST);
});

test("can report robot state", () => {
    const robotN = new Robot();
    robotN.place(0, 1, "NORTH");
    expect(robotN.report()).toBe("0,1,NORTH");

    const robotE = new Robot();
    robotE.place(2, 4, "EAST");
    expect(robotE.report()).toBe("2,4,EAST");

    const robotS = new Robot();
    robotS.place(0, 0, "SOUTH");
    expect(robotS.report()).toBe("0,0,SOUTH");
    
    const robotW = new Robot();
    robotW.place(3, 1, "WEST");
    expect(robotW.report()).toBe("3,1,WEST");
});

test("move throws an error when robot not placed", () => {
    const robot = new Robot();
    expect(() => robot.move()).toThrow();
});

test("ignores move command when not placed", () => {
    const robot = new Robot();
    robot.followCommand("MOVE");
    // The robot's location values should all still be undefined
    checkRobotValues(robot, false);
});

test("follows move command after being placed", () => {
    for (var x = 0; x < 4; x++) {
        const robotE = new Robot();
        robotE.place(x, 2, "EAST");
        robotE.followCommand("MOVE");
        checkRobotValues(robotE, true, x + 1, 2, Direction.EAST);
    }

    for (var x = 1; x < 5; x++) {
        const robotW = new Robot();
        robotW.place(x, 4, "WEST");
        robotW.followCommand("MOVE");
        checkRobotValues(robotW, true, x - 1, 4, Direction.WEST);
    }

    for (var y = 0; y < 4; y++) {
        const robotN = new Robot();
        robotN.place(1, y, "NORTH");
        robotN.followCommand("MOVE");
        checkRobotValues(robotN, true, 1, y + 1, Direction.NORTH);
    }

    for (var y = 1; y < 5; y++) {
        const robotS = new Robot();
        robotS.place(3, y, "SOUTH");
        robotS.followCommand("MOVE");
        checkRobotValues(robotS, true, 3, y - 1, Direction.SOUTH);
    }
});

test("rotate right throws an error when robot not placed", () => {
    const robot = new Robot();
    expect(() => robot.rotateRight()).toThrow();
});

test("ignores rotate right command when not placed", () => {
    const robot = new Robot();
    robot.followCommand("RIGHT");
    // The robot's location values should all still be undefined
    checkRobotValues(robot, false);
});

test("follows rotate right command after being placed", () => {
    const robotN = new Robot();
    robotN.place(2, 2, "NORTH");
    robotN.followCommand("RIGHT");
    checkRobotValues(robotN, true, 2, 2, Direction.EAST);

    const robotE = new Robot();
    robotE.place(3, 4, "EAST");
    robotE.followCommand("RIGHT");
    checkRobotValues(robotE, true, 3, 4, Direction.SOUTH);

    const robotS = new Robot();
    robotS.place(1, 2, "SOUTH");
    robotS.followCommand("RIGHT");
    checkRobotValues(robotS, true, 1, 2, Direction.WEST);

    const robotW = new Robot();
    robotW.place(4, 2, "WEST");
    robotW.followCommand("RIGHT");
    checkRobotValues(robotW, true, 4, 2, Direction.NORTH);
    robotW.followCommand("RIGHT");
    checkRobotValues(robotW, true, 4, 2, Direction.EAST);
});

test("rotate left throws an error when robot not placed", () => {
    const robot = new Robot();
    expect(() => robot.rotateLeft()).toThrow();
});

test("ignores rotate left command when not placed", () => {
    const robot = new Robot();
    robot.followCommand("LEFT");
    // The robot's location values should all still be undefined
    checkRobotValues(robot, false);
});

test("follows rotate left command after being placed", () => {
    const robotN = new Robot();
    robotN.place(0, 0, "NORTH");
    robotN.followCommand("LEFT");
    checkRobotValues(robotN, true, 0, 0, Direction.WEST);

    const robotW = new Robot();
    robotW.place(1, 4, "WEST");
    robotW.followCommand("LEFT");
    checkRobotValues(robotW, true, 1, 4, Direction.SOUTH);

    const robotS = new Robot();
    robotS.place(3, 3, "SOUTH");
    robotS.followCommand("LEFT");
    checkRobotValues(robotS, true, 3, 3, Direction.EAST);

    const robotE = new Robot();
    robotE.place(4, 2, "EAST");
    robotE.followCommand("LEFT");
    checkRobotValues(robotE, true, 4, 2, Direction.NORTH);
    robotE.followCommand("LEFT");
    checkRobotValues(robotE, true, 4, 2, Direction.WEST);
});

test("report throws an error when robot not placed", () => {
    const robot = new Robot();
    expect(() => robot.report()).toThrow();
});

test("ignores report command when not placed", () => {
    const robot = new Robot();
    robot.followCommand("REPORT");
    // The robot's location values should all still be undefined
    checkRobotValues(robot, false);
});

test("follows report command after being placed", () => {
    const robotN = new Robot();
    robotN.place(0, 1, "NORTH");
    const resultN = robotN.followCommand("REPORT");
    expect(resultN.report).toBe("0,1,NORTH");

    const robotE = new Robot();
    robotE.place(2, 4, "EAST");
    const resultE = robotE.followCommand("REPORT");
    expect(resultE.report).toBe("2,4,EAST");

    const robotS = new Robot();
    robotS.place(0, 0, "SOUTH");
    const resultS = robotS.followCommand("REPORT");
    expect(resultS.report).toBe("0,0,SOUTH");
    
    const robotW = new Robot();
    robotW.place(3, 1, "WEST");
    const resultW = robotW.followCommand("REPORT");
    expect(resultW.report).toBe("3,1,WEST");
});

test("follows place command", () => {
    const robotN = new Robot();
    robotN.followCommand("PLACE 2, 3, NORTH");
    checkRobotValues(robotN, true, 2, 3, Direction.NORTH);

    const robotE = new Robot();
    robotE.followCommand("PLACE 0,4,EAST");
    checkRobotValues(robotE, true, 0, 4, Direction.EAST);

    const robotS = new Robot();
    robotS.followCommand("PLACE 4,4,SOUTH");
    checkRobotValues(robotS, true, 4, 4, Direction.SOUTH);

    const robotW = new Robot();
    robotW.followCommand("PLACE 3,2,WEST");
    checkRobotValues(robotW, true, 3, 2, Direction.WEST);
})

test("returns an error on an unknown command", () => {
    const robotN = new Robot();
    robotN.place(0, 1, "NORTH");
    const result = robotN.followCommand("REPOR");
    expect(result.error).toBe("Unknown command");
});

test("returns an error on a malformed command", () => {
    const robotN = new Robot();
    robotN.place(0, 1, "NORTH");
    const result = robotN.followCommand("LEFT 5");
    expect(result.error).toBe("Malformed command");
});

test("returns an error with missing place arguments", () => {
    const robot = new Robot();
    const results = robot.followCommand("PLACE 3");
    expect(results.error).toBe("Three parameters required when placing");
});





// ===========================
// Test with provided examples
// ===========================

test("passes example a", () => {
    const robot = new Robot();

    robot.followCommand("PLACE 0,0,NORTH");
    robot.followCommand("MOVE");
    const result = robot.followCommand("REPORT");
    expect(result.report).toBe("0,1,NORTH");
});

test("passes example b", () => {
    const robot = new Robot();
    robot.followCommand("PLACE 0,0,NORTH");
    robot.followCommand("LEFT");
    const result = robot.followCommand("REPORT");
    expect(result.report).toBe("0,0,WEST");
});

test("passes example c", () => {
    const robot = new Robot();
    robot.followCommand("PLACE 1,2,EAST");
    robot.followCommand("MOVE");
    robot.followCommand("MOVE");
    robot.followCommand("LEFT");
    robot.followCommand("MOVE");
    const result = robot.followCommand("REPORT");
    expect(result.report).toBe("3,3,NORTH")
});

// ===========
// Extra tests
// ===========

test("only processes commands after first place", () => {
    const robot = new Robot();
    robot.followCommand("LEFT");
    robot.followCommand("LEFT");
    robot.followCommand("RIGHT");
    robot.followCommand("LEFT");
    robot.followCommand("MOVE");
    const result1 = robot.followCommand("REPORT");
    checkRobotValues(robot, false);
    expect(result1.error).toBe("Ignoring command as robot has not been placed");
    expect(result1.report).toBe(undefined);

    robot.followCommand("PLACE 0,2,NORTH");
    robot.followCommand("MOVE");
    robot.followCommand("MOVE");
    robot.followCommand("RIGHT");
    robot.followCommand("MOVE");
    robot.followCommand("MOVE");
    robot.followCommand("LEFT");
    const result2 = robot.followCommand("REPORT");
    expect(result2.report).toBe("2,4,NORTH");
});

test("ignores commands that would take it off the table", () => {
    const robot = new Robot();
    robot.followCommand("LEFT");
    robot.followCommand("RIGHT");
    robot.followCommand("PLACE 3,1,EAST");
    robot.followCommand("MOVE");
    robot.followCommand("MOVE");
    const result1 = robot.followCommand("REPORT");
    expect(result1.report).toBe("4,1,EAST");
    
    robot.followCommand("RIGHT");
    robot.followCommand("MOVE");
    const result2 = robot.followCommand("REPORT");
    expect(result2.report).toBe("4,0,SOUTH");
    
    robot.followCommand("MOVE");
    const result3 = robot.followCommand("REPORT");
    expect(result3.report).toBe("4,0,SOUTH");
    
    robot.followCommand("LEFT");
    robot.followCommand("MOVE");
    robot.followCommand("LEFT");
    const result4 = robot.followCommand("REPORT");
    expect(result4.report).toBe("4,0,NORTH");
});

test("handles multiple places", () => {
    const robot = new Robot();
    robot.followCommand("PLACE 3,2,SOUTH");
    const result1 = robot.followCommand("REPORT");
    expect(result1.report).toBe("3,2,SOUTH");

    robot.followCommand("PLACE 4,4, WEST");
    const result2 = robot.followCommand("REPORT");
    expect(result2.report).toBe("4,4,WEST");

    robot.followCommand("MOVE");
    robot.followCommand("MOVE");
    robot.followCommand("MOVE");
    robot.followCommand("LEFT");
    robot.followCommand("MOVE");
    const result3 = robot.followCommand("REPORT");
    expect(result3.report).toBe("1,3,SOUTH");
    
    robot.followCommand("PLACE 3,2,EAST");
    robot.followCommand("MOVE");
    robot.followCommand("MOVE");
    robot.followCommand("RIGHT");
    robot.followCommand("MOVE");
    robot.followCommand("MOVE");
    robot.followCommand("RIGHT");
    const result4 = robot.followCommand("REPORT");
    expect(result4.report).toBe("4,0,WEST");
})

// ========
// New Command
// ========


test("it can read a BLOCK command", () => {
    const robot = new Robot();
    robot.block(0, 0);
})

test("it will record blocked squares", () => {
    const robot = new Robot();
    robot.block(1, 4);
    expect(robot.blockedSquares.length).toBe(1);
    expect(robot.blockedSquares[0].x).toBe(1);
    expect(robot.blockedSquares[0].y).toBe(4);
})

test("blocking prevents placing on that square", () => {
    const robot = new Robot();
    robot.block(2, 3);
    robot.followCommand("PLACE 2, 3, NORTH");
    expect(robot.isPlaced).toBeFalsy();
})

test("blocking prevents movement into the square", () => {
    const robot = new Robot();
    robot.block(2,2);
    robot.followCommand("PLACE 2, 3, SOUTH");
    robot.followCommand("MOVE");
    const result = robot.followCommand("REPORT");
    expect(result.report).toBe("2,3,SOUTH");
})

test("can process block command", () => {
    const robot = new Robot();
    robot.followCommand("BLOCK 3,3");
    expect(robot.blockedSquares.length).toBe(1);
    expect(robot.blockedSquares[0].x).toBe(3);
    expect(robot.blockedSquares[0].y).toBe(3);
})

test("handles invalid block command", () => {
    const robot = new Robot();
    const result = robot.followCommand("BLOCK 3");
    expect(result.error).toBe("Two parameters required when blocking");
})