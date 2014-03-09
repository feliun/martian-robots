/* Understands a robot position and how to move it */

var _ = require('underscore');
var ORIENTATIONS = ['N', 'E', 'S', 'W'];

function Robot(posInfo) { 
    this.posInfo = posInfo;
    var that = this;

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

    this.moveFwd = function(canMoveFn) {
        //Compute new position
        //If it canMove, change it
    }
}

module.exports = Robot;