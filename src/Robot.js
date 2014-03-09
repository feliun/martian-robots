/* Understands a robot position and how to move it */

var _ = require('underscore');
var ORIENTATIONS = ['N', 'E', 'S', 'W'];
var constants = require('../src/Constants');

function Robot(posInfo) { 
    this.posInfo = posInfo;
    this.dead = false;

    var that = this;

    var modifyPosition = {
        "N" : function() { that.posInfo.y++; },
        "E" : function() { that.posInfo.x++; },
        "S" : function() { that.posInfo.y--; },
        "W" : function() { that.posInfo.x--; }
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
        switch(attempMove(this.posInfo)) {
            case constants.MOVE_OUTCOMES.MOVE: 
                modifyPosition[this.posInfo.orientation]();
                break;
            case constants.MOVE_OUTCOMES.FALL: 
                modifyPosition[this.posInfo.orientation]();
                this.dead = true;
                break;
        }
               
        return this.posInfo;
    }
}

module.exports = Robot;