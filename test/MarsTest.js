var mars = require('../src/Mars');
var constants = require('../src/Constants');
var assert = require("assert");

describe('Testing logic for planet Mars',function(){

    var ROWS = 10;
    var COLS = 10;

    mars.create({ x: ROWS, y: COLS });

    it('should has been initialized', function(done){
        assert.equal(mars.wasInitialized(), true);
        done();
    });

    it('should allow movement for the robot when there is no scent or edge', function(done){
        var result = mars.attempMove({ x: 3, y: 4, orientation: "W" }, { x: 2, y: 4 });
        assert.equal(result, constants.MOVE_OUTCOMES.MOVE);
        done();
    });

    it('should make the robot fall off at the left', function(done){
        var result = mars.attempMove({ x: 0, y: 4, orientation: "W" }, { x: -1, y: 4 });
        assert.equal(result, constants.MOVE_OUTCOMES.FALL);
        done();
    });

    it('should make the robot fall off at the bottom', function(done){
        var result = mars.attempMove({ x: 3, y: 0, orientation: "S" }, { x: 3, y: -1 });
        assert.equal(result, constants.MOVE_OUTCOMES.FALL);
        done();
    });

    it('should make the robot fall off at the top', function(done){
        var result = mars.attempMove({ x: 3, y: 9, orientation: "N" }, { x: 3, y: 10 });
        assert.equal(result, constants.MOVE_OUTCOMES.FALL);
        done();
    });

    it('should make the robot fall off at the right', function(done){
        var result = mars.attempMove({ x: 9, y: 2, orientation: "E" }, { x: 10, y: 2 });
        assert.equal(result, constants.MOVE_OUTCOMES.FALL);
        done();
    });

    it('should make the robot stand when it is on a scent cell', function(done){
        //In (0,4) there is a scent because the robot fell off already in the second test
        var result = mars.attempMove({ x: 0, y: 4, orientation: "W" }, { x: -1, y: 4 });
        assert.equal(result, constants.MOVE_OUTCOMES.STAND);
        done();
    });
});