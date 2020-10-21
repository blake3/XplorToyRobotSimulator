// While lower camel case would normally be used for a
// variable, upper camel case is used here as it will
// be used as an enum.
export const Direction = {
    NORTH: 0,
    EAST: 90,
    SOUTH: 180,
    WEST: 270,
}
Object.freeze(Direction);

const directionDescriptions = {
    0: "NORTH",
    90: "EAST",
    180: "SOUTH",
    270: "WEST",
}

export class Robot{
    constructor() {
        this.isPlaced = false;
        this.blockedSquares = [];
    }

    place(x, y, facing) {
        // This implementation assumes only integer positions are valid
        const xNum = parseFloat(x);
        const yNum = parseFloat(y);
        const xIsValid = Number.isInteger(xNum) && 0 <= xNum && xNum <= 4;
        const yIsValid = Number.isInteger(yNum) && 0 <= yNum && yNum <= 4;
        const facingIsValid = Direction.hasOwnProperty(facing);

        if ( xIsValid && yIsValid && facingIsValid) {
            // The starting position is valid
            for (let i = 0; i < this.blockedSquares.length; i++) {
                const square = this.blockedSquares[i];
                if (square.x === xNum && square.y === yNum) {
                    return;
                }
            }
            this.isPlaced = true;
            this.x = xNum;
            this.y = yNum;
            this.facing = Direction[facing];
        }
    }

    move() {
        const invalidMoveEast = this.x === 4 && this.facing === Direction.EAST;
        const invalidMoveWest = this.x === 0 && this.facing === Direction.WEST;
        const invalidMoveSouth = this.y === 0 && this.facing === Direction.SOUTH;
        const invalidMoveNorth = this.y === 4 && this.facing === Direction.NORTH;
        const invalidMove = invalidMoveEast || invalidMoveWest || invalidMoveSouth || invalidMoveNorth;
        if (invalidMove) {
            return;
        }
        // If we get to this point we know the robot is allowed to move
        let newX = this.x, newY = this.y;
        switch (this.facing) {
            case Direction.NORTH:
                newY += 1;
                break;
            case Direction.SOUTH:
                newY -= 1;
                break;
            case Direction.EAST:
                newX += 1;
                break;
            case Direction.WEST:
                newX -= 1;
                break;
            default:
                throw Error("No direction to move in");
        }
        for (let i = 0; i < this.blockedSquares.length; i++) {
            const square = this.blockedSquares[i];
            if (square.x === newX && square.y === newY) {
                return;
            }
        }
        this.x = newX;
        this.y = newY;
    }

    rotateRight() {
        if (this.facing === undefined) {
            throw Error("No direction to start rotation")
        }
        this.facing = (this.facing + 90) % 360;
    }

    rotateLeft() {
        // Subtract 90 to perform the rotation, 
        // then add 360 to shift the value by 
        // a full rotation so all values are positive,
        // then mod 360 to get the simplified offset.
        if (this.facing === undefined) {
            throw Error("No direction to start rotation")
        }
        this.facing = (this.facing - 90 + 360) % 360;
    }

    block(x, y) {
        const xNum = parseFloat(x);
        const yNum = parseFloat(y);
        const xIsValid = Number.isInteger(xNum) && 0 <= xNum && xNum <= 4;
        const yIsValid = Number.isInteger(yNum) && 0 <= yNum && yNum <= 4;
        if (xIsValid && yIsValid) {
            this.blockedSquares.push({x: xNum, y: yNum});
        }
    }

    report() {
        if (this.facing === undefined) {
            throw Error("No direction to report");
        }
        const direction = directionDescriptions[this.facing];
        return `${this.x},${this.y},${direction}`;
    }

    followCommand(command) {
        let action;
        let parameters = "";
        let report;
        let error;
        
        const commandUpper = command.toUpperCase();
        const separatorIndex = commandUpper.indexOf(" ");
        if (separatorIndex === -1) {
            action = commandUpper;
        } else {
            action = commandUpper.slice(0, separatorIndex);
            parameters = commandUpper.slice(separatorIndex + 1).replace(" ", "").split(",");
        }
        const validActions = ["PLACE", "MOVE", "LEFT", "RIGHT", "REPORT", "BLOCK"];
        if (!validActions.includes(action)) {
            return { error: "Unknown command"}
        }
        
        if (action === "PLACE") {
            if (parameters.length !== 3) {
                error = "Three parameters required when placing";
            } else {
                this.place(parameters[0].trim(), parameters[1].trim(), parameters[2].trim());
            }
        } else if (action === "BLOCK") {
            if (parameters.length !== 2) {
                error = "Two parameters required when blocking";
            } else {
                this.block(parameters[0].trim(), parameters[1].trim())
            }
        } else if (this.isPlaced) {
            if (parameters !== "") {
                error = "Malformed command"
            } else {
                switch(action) {
                    case "MOVE":
                        this.move();
                        break;
                    case "RIGHT":
                        this.rotateRight();
                        break;
                    case "LEFT":
                        this.rotateLeft();
                        break;
                    case "REPORT":
                        report = this.report();
                        break;
                    default:
                        error = "Unknown command";
                        break;
                }
            }
        } else {
            error = "Ignoring command as robot has not been placed";
        }
        return { report, error };        
    }
}