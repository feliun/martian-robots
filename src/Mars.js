/* Understands Mars surface and its behaviour */

var constants = require('../src/Constants');

module.exports = (function() {

    var scentGrids = []; //keeps track of scents
    var x_dimension = 0;
    var y_dimension = 0;

    function wasInitialized() {
        return x_dimension != 0 && y_dimension != 0;
    };

    function create(gridSize) {
        x_dimension = (gridSize.x <= constants.MAX_COORD) ? gridSize.x : constants.MAX_COORD;
        y_dimension = (gridSize.y <= constants.MAX_COORD) ? gridSize.y : constants.MAX_COORD;
        for(var i = 0; i < x_dimension; i++) {
            scentGrids[i] = new Array(y_dimension);
            for(var j = 0; j < y_dimension; j++) {
                scentGrids[i][j] = false;
            }
        }
    };

    function attempMove(robotCurrentPos, robotNewPos) {
        if (scentGrids[robotCurrentPos.x][robotCurrentPos.y] === true && itGoesOutOfBoundaries()) {
            return constants.MOVE_OUTCOMES.STAND;    
        } else if(itGoesOutOfBoundaries()) {
            setScent();
            return constants.MOVE_OUTCOMES.FALL;
        } else {
            return constants.MOVE_OUTCOMES.MOVE;
        }

        function setScent() {
            scentGrids[robotCurrentPos.x][robotCurrentPos.y] = true;
        };

        function itGoesOutOfBoundaries() {
            return (robotNewPos.x < 0) || (robotNewPos.y < 0) || 
                   (robotNewPos.x >= x_dimension) || (robotNewPos.y >= y_dimension);
        };
    };

    return { create: create,
             attempMove: attempMove,
             wasInitialized: wasInitialized };

})()