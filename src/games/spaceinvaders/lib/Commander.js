import { Vector, TimeStep, Random } from 'game_core';

export default class Commander {

  constructor(mobWave) {
    this.mobWave = mobWave;
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

  whoShoots() {
    const shotCandidates = [];

    this.mobWave.getMobLines().forEach((mobLine, line) => {
      mobLine.getMobs().forEach((mob, col) => {
        shotCandidates.push({x: col, y: line})
      });
    });

    var whoShoots = Random.get(shotCandidates.length - 1);
    return shotCandidates[whoShoots];
  }

  getNextStep(mobStep) {
    return this.marchStep.timesVect(mobStep)
  }

  getOver() {
    return this.marchStep.getY() >= 10;
  }

  reset() {
    this.marchStep = new Vector(8, 2);
  }
}