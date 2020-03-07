import Vector from 'games/core/Vector.js';
import TimeStep from 'games/core/TimeStep.js';

export default class Commander {

  constructor() {
    this.timeStep = new TimeStep(500)
    this.marchStep = new Vector(8, 2)
    this.direction = 1;
  }

  march() {
    if (!this.timeStep.get()) {
      return false;
    }

    if (this.marchStep.getX() == 16 && this.direction == 1
        || this.marchStep.getX() == 0 && this.direction == -1) {
      this.marchStep.setY(this.marchStep.getY() + 1)
      this.direction = -this.direction
    } else {
      this.marchStep.setX(this.marchStep.getX() + this.direction)
    }

    return true;
  }

  getStep() {
    return this.marchStep;
  }

  getOver() {
    return this.marchStep.getY() >= 10;
  }

  reset() {
    this.marchStep = new Vector(8, 2);
  }
}