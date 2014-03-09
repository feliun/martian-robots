/* Understands */

function Robot(posInfo) {
  this.posInfo = posInfo;
}

Robot.prototype.print = function() {
    console.log(this.posInfo);
};

//public methods: rotate (param) - create List N,E,S,W and add/sub depending on direction
//, moveFwd

module.exports = Robot;