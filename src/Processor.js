/* Understands input commands */

var constants = require('../src/Constants');
var _ = require('underscore');

module.exports = (function() {

    function create(planet, RobotClass) {
        this.planet = planet;
        this.Robot = RobotClass;
        this.robot = undefined;
        this.turnForRobotPos = true;
    };

    function processCommand(command) {
        var that = this;

        if (!this.planet.wasInitialized()) {
            return initPlanet(command);    
        } else if(this.turnForRobotPos) {
            this.turnForRobotPos = false;
            return initRobotPosition(command);
        } else {
            this.turnForRobotPos = true;
            return processInstruction(command);
        }

        function initPlanet(dimensions) {
            var args = dimensions.split(" ");
            if (args.length != 2) {
                args = [constants.MAX_COORD, constants.MAX_COORD];
                console.log('Invalid dimensions: setting to maximum size');    
            }
            that.planet.create({ x: parseInt(args[0]), y: parseInt(args[1]) });
            return "";
        };

        function initRobotPosition(initialPosition) {
            var args = initialPosition.split(" ");
            if (args.length != 3) {
                args = [0, 0, "E"];
                console.log('Invalid position for robot: setting to initial cell');    
            }
            that.robot = new that.Robot({ x: parseInt(args[0]), y: parseInt(args[1]), orientation: args[2] });
            return "";
        };

        function processInstruction(instructions) {
            var output = "";
            var lost = false;
            if (instructions.length > constants.MAX_INSTRUCTION) 
                instructions = instructions.substring(0, constants.MAX_INSTRUCTION);
            for(var i = 0; (i < instructions.length) && (!lost); i ++) {
                switch(instructions[i]) {
                    case "L":
                        that.robot.rotateLeft();
                        break;
                    case "R":
                        that.robot.rotateRight();
                        break;
                    case "F":
                        that.robot.moveFwd(that.planet.attempMove);
                        break;
                    default: console.log('Instruction not valid: ', instructions[i]);
                }
                output = that.robot.print();
                if (output.indexOf("LOST") != -1) lost = true;
            }
            return output;
        };
    };

    return { create: create,
             processCommand: processCommand };

})()