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

  getMobs() {
    return this.mobs;
  }

  update(line, offset) {
    this.mobs.forEach((mob, col) => {
      if (mob == null) {
        return;
      }

      if (mob.isDestroyed()) {
        this.mobs[col] = null;
        return;
      }

      mob.update(col, line, offset);
    });
  }

  draw(ctx, line, offset) {
    this.mobs.forEach((mob, col) => {
      if (mob != null) {
        mob.draw(ctx);
      }
    });
  }
}