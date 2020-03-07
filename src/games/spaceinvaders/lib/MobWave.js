const mobImg = 'https://aaron-site.s3-us-west-1.amazonaws.com/game-assets/space-invaders/mobs/bug-001-64.png'

import MobLine from './MobLine.js';
import Commander from './Commander.js';
import Vector from 'games/core/Vector.js';

export default class MobWave {

  constructor(mobRows, mobColumns) {
    this.mobRows = mobRows;
    this.mobColumns = mobColumns;

    this.mobLines = [];

    this.mob = new Image()
    this.mob.src = mobImg;

    this.commander = new Commander();
  }

  configure(gameWidth, gameHeight, scale) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    this.mobSize = this.gameWidth / scale;
    this.mobStep = new Vector(this.mobSize / 4, this.mobSize);
    this.mobOffset = this.commander.getStep().timesVect(this.mobStep);

    this.bounds = new Vector(this.mobColumns * this.mobSize, this.mobRows * this.mobSize);

    for (let row = 0; row < this.mobRows; row++) {
      var mobLine = new MobLine(this.mob, this.mobColumns);
      mobLine.configure(this.gameWidth, this.gameHeight, this.mobSize);

      this.mobLines.push(mobLine)
    }
  }

  update() {
    if (this.commander.march()) {
      this.mobOffset = this.commander.getStep().timesVect(this.mobStep)
    }

    if (this.commander.getOver()) {
      this.commander.reset()
    }
  }

  draw(ctx) {
    this.mobLines.forEach((mobLine, line) => {
      mobLine.draw(ctx, line, this.mobOffset)
    });
  }
}