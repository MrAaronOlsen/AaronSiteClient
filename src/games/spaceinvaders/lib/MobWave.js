const MOB_ONE_IMG_URL = 'https://aaron-site.s3-us-west-1.amazonaws.com/game-assets/space-invaders/mobs/bug-001-64.png'
const LASER_ONE_IMG_URL = 'https://aaron-site.s3-us-west-1.amazonaws.com/game-assets/space-invaders/bullets/bug-laser-01-32.png'

import { Vector } from 'game_core'

import Mob from './Mob.js';
import Commander from './Commander.js';
import BulletFactory from './BulletFactory.js';
import Bullet from './Bullet.js';
import ScenePlay from './ScenePlay.js'

const WAVE_LINES = 5;
const WAVE_COLUMNS = 11;

export default class MobWave {

  constructor(scene) {
    this.scene = scene;
    this.mobs = [];

    this.mobImg = new Image()
    this.mobImg.src = MOB_ONE_IMG_URL;

    this.bugLaserAsset = new Image();
    this.bugLaserAsset.src = LASER_ONE_IMG_URL;

    this.commander = new Commander();

    this.gameWidth = scene.width;
    this.gameHeight = scene.height;
    this.scale = scene.scale;
    this.collider = scene.collider;

    this.configure();
    this.setCollider();
  }

  configure() {
    this.mobSize = this.gameWidth / this.scale;
    this.mobCenter = new Vector(this.mobSize / 2, this.mobSize)

    this.mobStep = new Vector(this.mobSize / 4, this.mobSize);
    this.mobOffset = this.commander.getNextStep(this.mobStep);

    for (let row = 0; row < WAVE_LINES; row++) {
      for (let col = 0; col < WAVE_COLUMNS; col++) {
        this.mobs.push(new Mob(this.mobImg, new Vector(col, row), this.mobSize))
      }
    }
  }

  setCollider() {

    this.mobs.forEach((mob) => {
      this.collider.addCollidable("mob", mob);
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
    if (this.mobs.length === 0) {
      this.scene.reset()
    }

    if (this.commander.march()) {
      this.mobOffset = this.commander.getNextStep(this.mobStep);
    }

    if (this.commander.getOver(this.mobs)) {
      this.commander.reset()
    }

    this.mobs.forEach((mob, i) => {
      if (mob == null) {
        return;
      }

      if (mob.isDestroyed()) {
        this.mobs[i] = null;
        return;
      }

      mob.update(this.mobOffset);
    });

    this.mobs = this.mobs.filter(mob => {
      return mob != null;
    })

    this.bullets.update();

    const whoShoots = this.commander.whoShoots(this.mobs);
    if (whoShoots) {
      const bulletPos = whoShoots.pos.plus(this.mobCenter)
      this.bullets.addBullet(bulletPos);
    }
  }

  pause() {
    this.commander.pause();
  }

  draw(ctx) {
    this.mobs.forEach((mob) => {
      if (mob != null) {
        mob.draw(ctx)
      }
    });

    this.bullets.draw(ctx);
  }
}