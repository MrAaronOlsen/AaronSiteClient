import { Vector, TimeStep, Random } from 'game_core';

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

  pause() {
    this.timeStep.pause(1000);
  }

  whoShoots(mobs) {
    return Random.get(60) === 30 ? mobs[Random.get(mobs.length - 1)] : null;
  }

  getNextStep(mobStep) {
    return this.marchStep.timesVect(mobStep)
  }

  getOver(mobs) {
    return this.marchStep.getY() >= 10;
  }

  reset() {
    this.marchStep = new Vector(8, 2);
  }
}