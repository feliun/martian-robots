module.exports = (function() {
    
    var MOVE_OUTCOMES = {
        MOVE: 0,
        STAND: 1,
        FALL: 2
    };

    var MAX_COORD = 50;

    var MAX_INSTRUCTION = 100;

    return { MOVE_OUTCOMES: MOVE_OUTCOMES,
             MAX_COORD: MAX_COORD };

})()

