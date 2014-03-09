var Robot = require('../src/Robot');
var assert = require("assert");

describe('Testing logic for a robot',function(){
    
    var robot = new Robot({ x: 2, y: 3, orientation: 'N' });

    it('should rotate left without changing its position', function(done){
        var newPosition = robot.rotateLeft();
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
        var newPosition = robot.rotateRight();
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
        done();
    });

    it('should moveForward when facing East', function(done){
        done();
    });

    it('should moveForward when facing South', function(done){
        done();
    });

    it('should moveForward when facing West', function(done){
        done();
    });
    
});