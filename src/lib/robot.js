export class RobotPosition{
    constructor(x, y, facing) {
        this.x = x;
        this.y = y;
        this.facing = facing;
    }

    followCommand(command) {
        const commandParts = command.split(" ", 2);
        switch(commandParts[0]) {
            case "place":
                break;
                
        }
    }
}