var Robot = require('../src/Robot');
var constants = require('../src/Constants');
var assert = require("assert");

describe('Testing logic for a robot',function(){
    
    var robot = new Robot({ x: 2, y: 3, orientation: 'N' });
    var newPosition = {};
    
    //This functions mock the information provided by the planet
    var attemptValidMove = function(posInfo) {
        return constants.MOVE_OUTCOMES.MOVE;
    };

    var attemptMoveToScent = function(posInfo) {
        return constants.MOVE_OUTCOMES.STAND;
    };

    var attemptMoveAndFall = function(posInfo) {
        return constants.MOVE_OUTCOMES.FALL;
    };

    it('should rotate left without changing its position', function(done){
        newPosition = robot.rotateLeft();
        assert.deepEqual({ x: 2, y: 3, orientation: 'W' }, newPosition);
        newPosition = robot.rotateLeft();
        assert.deepEqual({ x: 2, y: 3, orientation: 'S' }, newPosition);
        newPosition = robot.rotateLeft();
        assert.deepEqual({ x: 2, y: 3, orientation: 'E' }, newPosition);
        newPosition = robot.rotateLeft();
        assert.deepEqual({ x: 2, y: 3, orientation: 'N' }, newPosition);
        done();
    });

    it('should rotate right without changing its position', function(done){
        newPosition = robot.rotateRight();
        assert.deepEqual({ x: 2, y: 3, orientation: 'E' }, newPosition);
        newPosition = robot.rotateRight();
        assert.deepEqual({ x: 2, y: 3, orientation: 'S' }, newPosition);
        newPosition = robot.rotateRight();
        assert.deepEqual({ x: 2, y: 3, orientation: 'W' }, newPosition);
        newPosition = robot.rotateRight();
        assert.deepEqual({ x: 2, y: 3, orientation: 'N' }, newPosition);
        done();
    });

    it('should moveForward when facing North', function(done){
        robot = new Robot({ x: 2, y: 3, orientation: 'N' });
        newPosition = robot.moveFwd(attemptValidMove);
        assert.deepEqual({ x: 2, y: 4, orientation: 'N' }, newPosition);
        done();
    });

    it('should moveForward when facing East', function(done){
        robot = new Robot({ x: 2, y: 3, orientation: 'E' });
        newPosition = robot.moveFwd(attemptValidMove);
        assert.deepEqual({ x: 3, y: 3, orientation: 'E' }, newPosition);
        done();
    });

    it('should moveForward when facing South', function(done){
        robot = new Robot({ x: 2, y: 3, orientation: 'S' });
        newPosition = robot.moveFwd(attemptValidMove);
        assert.deepEqual({ x: 2, y: 2, orientation: 'S' }, newPosition);
        done();
    });

    it('should moveForward when facing West', function(done){
        robot = new Robot({ x: 2, y: 3, orientation: 'W' });
        newPosition = robot.moveFwd(attemptValidMove);
        assert.deepEqual({ x: 1, y: 3, orientation: 'W' }, newPosition);
        done();
    });

    it('should stand still when there is a scent', function(done){
        robot = new Robot({ x: 0, y: 3, orientation: 'W' });
        newPosition = robot.moveFwd(attemptMoveToScent);
        assert.deepEqual({ x: 0, y: 3, orientation: 'W' }, newPosition);
        done();
    });

    it('should print its position', function(done){
        robot = new Robot({ x: 2, y: 3, orientation: 'N' });
        var output = robot.print();
        assert.equal("2 3 N", output);
        done();
    });

    it('should print its position with LOST when it falls off', function(done){
        robot = new Robot({ x: 0, y: 0, orientation: 'S' });
        newPosition = robot.moveFwd(attemptMoveAndFall);
        var output = robot.print();
        assert.equal("0 -1 S LOST", output);
        done();
    });

});