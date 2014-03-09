var _ = require('underscore');

var Robot = require('./src/Robot');
var Mars = require('./src/Mars');

var robot = new Robot('hello 1');

console.log(robot);

var robot2 = new Robot('hello 2');
console.log(robot2);

var planet = Mars.create('mars');

console.log('success');
   
