var processor = require('../src/Processor');
var mars = require('../src/Mars');
var Robot = require('../src/Robot');
var assert = require("assert");

describe('Testing logic for commands Processor',function(){

    processor.create(mars, Robot);

    it('should initialize the planet (since it is the first command) and generate no output', function(done){
        var output = processor.processCommand("4 5");
        assert.equal(output, "");
        done();
    });

    it('should set the initial robot position and generate no output', function(done){
        var output = processor.processCommand("2 3 N");
        assert.equal(output, "");
        done();
    });

    it('should execute the robot instruction', function(done){
        var output = processor.processCommand("RRFRFFLF");
        assert.equal(output, "0 1 S");
        done();
    });

    it('should set a new initial robot position and generate no output', function(done){
        var output = processor.processCommand("1 3 E");
        assert.equal(output, "");
        done();
    });

    it('should execute the robot instruction. The robot should fall off', function(done){
        var output = processor.processCommand("LLFLLFLRFFF");
        assert.equal(output, "4 3 E LOST");//(3,3) has a scent now
        done();
    });

    it('should set a new initial robot position and generate no output', function(done){
        var output = processor.processCommand("2 1 S");
        assert.equal(output, "");
        done();
    });

    it('should execute the robot instruction. The robot should fall off and the rest of instructions should be skipped', function(done){
        var output = processor.processCommand("RFLRFFLRFFFRRFFFFFLLRFLRRRLFF");
        assert.equal(output, "-1 1 W LOST");
        done();
    });

    it('should set a new initial robot position and generate no output', function(done){
        var output = processor.processCommand("1 4 E");
        assert.equal(output, "");
        done();
    });

    it('should execute the robot instruction. The robot should not fall off because there is a scent', function(done){
        var output = processor.processCommand("FFRFLFFFFFFFFFFFFFFFFFFFFFRF");
        //when it reaches the scent in (3,3) it doesn't move forward to the right
        assert.equal(output, "3 2 S");
        done();
    });

});