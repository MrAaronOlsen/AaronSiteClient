import Mob from './Mob.js';
import Vector from 'games/core/Vector.js';

export default class MobLine {

  constructor(mob, columns) {
    this.columns = columns;
    this.mob = mob;
    this.mobs = [];
  }

  configure(gameWidth, gameHeight, mobSize) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.mobSize = mobSize;

    for (let col = 0; col < this.columns; col++) {
      this.mobs.push(new Mob(this.mob, this.mobSize))
    }
  }

  update() {

  }

  draw(ctx, line, offset) {
    this.mobs.forEach((mob, col) => {
      mob.draw(ctx, new Vector(col * this.mobSize, line * this.mobSize).plus(offset) )
    });
  }
}