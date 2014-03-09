var _ = require('underscore');

var Robot = require('./src/Robot');
var Mars = require('./src/Mars');

var robot = new Robot('hello 1');
robot.print();

var robot2 = new Robot('hello 2');
robot2.print();

var planet = Mars.create('mars');

console.log('success');
   
