export const Direction = {
    NORTH: 0,
    EAST: 90,
    SOUTH: 180,
    WEST: 270,
}
Object.freeze(Direction);

export class Robot{
    constructor(x, y, facing) {
        this.x = x;
        this.y = y;
        this.facing = Direction[facing];
    }

    static placeRobot(x, y, facing) {
        // This implementation assumes only integer positions are valid
        const xIsValid = Number.isInteger(x) && 0 <= x && x <= 4;
        const yIsValid = Number.isInteger(y) && 0 <= y && y <= 4;
        const facingIsValid = Direction.hasOwnProperty(facing);
        
        if ( xIsValid && yIsValid && facingIsValid) {
            // The starting position is valid
            return new Robot(x, y, facing);
        }
    }

    move() {
        
    }

    followCommand(command) {
        const commandParts = command.split(" ", 2);
        switch(commandParts[0]) {
            case "place":
                break;
                
        }
    }
}