const mobImg = 'https://aaron-site.s3-us-west-1.amazonaws.com/game-assets/space-invaders/mobs/bug-001-64.png'
const bugLaserUrl = 'https://aaron-site.s3-us-west-1.amazonaws.com/game-assets/space-invaders/bullets/bug-laser-01-32.png'

import { Vector } from 'game_core'

import MobLine from './MobLine.js';
import Commander from './Commander.js';
import BulletFactory from './BulletFactory.js';
import Bullet from './Bullet.js';

export default class MobWave {

  constructor(mobRows, mobColumns) {
    this.mobRows = mobRows;
    this.mobColumns = mobColumns;

    this.mobLines = [];

    this.mob = new Image()
    this.mob.src = mobImg;

    this.bugLaserAsset = new Image();
    this.bugLaserAsset.src = bugLaserUrl;

    this.commander = new Commander(this);
  }

  configure(gameWidth, gameHeight, scale) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    this.mobSize = this.gameWidth / scale;
    this.mobStep = new Vector(this.mobSize / 4, this.mobSize);
    this.mobOffset = this.commander.getNextStep(this.mobStep);

    this.bounds = new Vector(this.mobColumns * this.mobSize, this.mobRows * this.mobSize);

    for (let row = 0; row < this.mobRows; row++) {
      var mobLine = new MobLine(this.mob, this.mobColumns);
      mobLine.configure(this.gameWidth, this.gameHeight, this.mobSize);

      this.mobLines.push(mobLine)
    }
  }

  getMobLines() {
    return this.mobLines;
  }

  setCollider(collider) {
    this.collider = collider;

    this.mobLines.forEach((mobLine) => {
      mobLine.getMobs().forEach((mob) => {
        this.collider.addCollidable("mob", mob);
      });
    });

    this.bullets = new BulletFactory()
      .setLimit(3)
      .setFactory(pos => {
        var bullet = new Bullet(this.bugLaserAsset, pos, new Vector(0, 6));
        bullet.configure(3, 16);
        bullet.centerX();

        this.collider.addCollidable("mobBullet", bullet);

        return bullet;
      })
  }

  update() {
    if (this.commander.march()) {
      this.mobOffset = this.commander.getNextStep(this.mobStep);
    }

    if (this.commander.getOver()) {
      this.commander.reset()
    }

    this.mobLines.forEach((mobLine, line) => {
      mobLine.update(line, this.mobOffset)
    });

    this.bullets.update();

    const whoShoots = this.commander.whoShoots();
    const pos = new Vector(whoShoots.x, whoShoots.y).times(this.mobSize).plus(this.mobOffset);

    const bulletPos = pos.plus(new Vector(this.mobSize / 2, this.mobSize));
    this.bullets.addBullet(bulletPos);
  }

  draw(ctx) {
    this.mobLines.forEach((mobLine, line) => {
      mobLine.draw(ctx)
    });

    this.bullets.draw(ctx);
  }
}