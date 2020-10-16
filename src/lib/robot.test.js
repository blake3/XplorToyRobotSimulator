import { Direction, Robot } from './robot';

test("can initialise robot with parameters", () => {
    // We only test with valid inputs here because 
    // it is assumed the constructor will only be
    // directly called with verified input.
    // Unverified input will be handled by the static
    // placeRobot method.
    const robotN = new Robot(0, 0, "NORTH");
    expect(robotN.x).toBe(0);
    expect(robotN.y).toBe(0);
    expect(robotN.facing).toBe(Direction.NORTH);

    const robotS = new Robot(1, 4, "SOUTH");
    expect(robotS.x).toBe(1);
    expect(robotS.y).toBe(4);
    expect(robotS.facing).toBe(Direction.SOUTH);

    const robotE = new Robot(2, 2, "EAST");
    expect(robotE.x).toBe(2);
    expect(robotE.y).toBe(2);
    expect(robotE.facing).toBe(Direction.EAST);

    const robotW = new Robot(3, 4, "WEST");
    expect(robotW.x).toBe(3);
    expect(robotW.y).toBe(4);
    expect(robotW.facing).toBe(Direction.WEST);
});

test("cannot place robot with non-integer position", () => {
    // It has been assumed that only integer positions are allowed.
    expect(Robot.placeRobot(0.3, 3, "NORTH")).toBe(undefined);
    expect(Robot.placeRobot(3, 0.1, "SOUTH")).toBe(undefined);
    expect(Robot.placeRobot("x pos", 3, "EAST")).toBe(undefined);
    expect(Robot.placeRobot(3, "y pos", "WEST")).toBe(undefined);
});

test("cannot place robot outside bounds", () => {
    expect(Robot.placeRobot(-1, 0, "NORTH")).toBe(undefined)
    expect(Robot.placeRobot(1, -3, "EAST")).toBe(undefined)
    expect(Robot.placeRobot(5, 0, "NORTH")).toBe(undefined)
    expect(Robot.placeRobot(1, 10, "NORTH")).toBe(undefined)
});

test("can place robot in valid position", () => {
    const robotN = Robot.placeRobot(2, 3, "NORTH");
    expect(robotN.x).toBe(2);
    expect(robotN.y).toBe(3);
    expect(robotN.facing).toBe(Direction.North);

    const robotE = Robot.placeRobot(0, 4, "EAST");
    expect(robotE.x).toBe(0);
    expect(robotE.y).toBe(4);
    expect(robotE.facing).toBe(Direction.EAST);

    const robotS = Robot.placeRobot(4, 4, "SOUTH");
    expect(robotS.x).toBe(4);
    expect(robotS.y).toBe(4);
    expect(robotS.facing).toBe(Direction.SOUTH);

    const robotW = Robot.placeRobot(3, 2, "WEST");
    expect(robotW.x).toBe(3);
    expect(robotW.y).toBe(2);
    expect(robotW.facing).toBe(Direction.WEST);
})

test("cannot move robot outside bounds", () => {
    // expect(new Robot(0,0,"NORTH") === new Robot(0,0,"NORTH")).toBeTruthy()
})