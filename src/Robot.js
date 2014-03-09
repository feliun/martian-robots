/* Understands a robot position and how to move it */

var _ = require('underscore');
var ORIENTATIONS = ['N', 'E', 'S', 'W'];
var constants = require('../src/Constants');

function Robot(posInfo) { 
    this.posInfo = posInfo;
    this.dead = false;

    var that = this;

    var calculateNewPos = {
        "N" : function() { return { x: that.posInfo.x, y: that.posInfo.y + 1 }; },
        "E" : function() { return { x: that.posInfo.x + 1, y: that.posInfo.y }; },
        "S" : function() { return { x: that.posInfo.x, y: that.posInfo.y - 1 }; },
        "W" : function() { return { x: that.posInfo.x - 1, y: that.posInfo.y }; }
    }

    function rotate(changeOrientationFn) {
        var newOrientationIndex = changeOrientationFn(_.indexOf(ORIENTATIONS, that.posInfo.orientation));
        that.posInfo.orientation = ORIENTATIONS[newOrientationIndex];
        return that.posInfo;
    };

    this.rotateLeft = function() {
        var changeOrientationLeft = function(currentOrientation) {
            return (currentOrientation - 1 < 0) ? ORIENTATIONS.length - 1 : currentOrientation - 1;
        };
        return rotate(changeOrientationLeft);
    }
    
    this.rotateRight = function() {
        var changeOrientationRight = function(currentOrientation) {
            return (currentOrientation + 1) % 4;
        };
        return rotate(changeOrientationRight);
    }

    this.print = function() {
        var isDead = this.dead ? " LOST" : "";
        return this.posInfo.x + " " + this.posInfo.y + " " + this.posInfo.orientation + isDead
    }

    this.moveFwd = function(attempMove) {
        var potentialNewPos = calculateNewPos[this.posInfo.orientation]();
        switch(attempMove(this.posInfo, potentialNewPos)) {
            case constants.MOVE_OUTCOMES.MOVE: 
                this.posInfo.x = potentialNewPos.x;
                this.posInfo.y = potentialNewPos.y;
                break;
            case constants.MOVE_OUTCOMES.FALL: 
                this.posInfo.x = potentialNewPos.x;
                this.posInfo.y = potentialNewPos.y;
                this.dead = true;
                break;
        }
               
        return this.posInfo;
    }
}

module.exports = Robot;