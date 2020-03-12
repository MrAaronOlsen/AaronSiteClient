const SHIP_IMG_URL = 'https://aaron-site.s3-us-west-1.amazonaws.com/game-assets/space-invaders/mobs/ship-01-64.png'
const LASER_IMG_URL = 'https://aaron-site.s3-us-west-1.amazonaws.com/game-assets/space-invaders/bullets/player-laser-01-32.png'

import { Vector } from 'game_core'

import GameAsset from './GameAsset.js'
import BulletFactory from './BulletFactory.js';
import Bullet from './Bullet.js';

export default class Player extends GameAsset {
  constructor(scene) {
    super()

    this.shipImg = new Image()
    this.shipImg.src = SHIP_IMG_URL

    this.laserImg = new Image();
    this.laserImg.src = LASER_IMG_URL;

    this.gameWidth = scene.width;
    this.gameHeight = scene.height;
    this.scale = scene.scale;
    this.collider = scene.collider;

    this.width = this.gameWidth / this.scale;
    this.height = this.gameHeight / this.scale;

    this.pos = new Vector((this.gameWidth / 2) - (this.width / 2), this.gameHeight - this.height)
    this.lastPos = this.pos.clone()

    this.vel = new Vector(0, 0)

    this.setCollider();
  }

  setCollider() {
    this.collider.addCollidable("player", this);

    this.bullets = new BulletFactory()
      .setLimit(1)
      .setFactory(pos => {
        var bullet = new Bullet(this.laserImg, pos, new Vector(0, -10));
        bullet.configure(3, 16);
        bullet.centerX();
        bullet.alignBottom();

        this.collider.addCollidable("playerBullet", bullet);

        return bullet;
      })
  }

  update() {
    this.lastPos = this.pos.clone()

    if (this.isDestroyed()) {
      console.log("Player is dead!")
    }

    if (this.pos.x > (this.gameWidth - this.width) && this.vel.x > 0 || this.pos.x < 0 && this.vel.x < 0) {
      return
    }

    this.pos.add(this.vel)
    this.bullets.update();
  }

  check(controller) {
    if (controller.left()) {
      this.vel = new Vector(-5, 0)
    } else if (controller.right()) {
      this.vel = new Vector(5, 0)
    } else if (controller.space()) {
      this.bullets.addBullet(this.pos.plus(new Vector(this.width / 2), 0));
    } else {
      this.vel = new Vector(0, 0)
    }
  }

  clearImg(ctx) {
    if (this.lastPos) {
      ctx.clearRect(this.lastPos.x, this.lastPos.y, this.width, this.height);
    }
  }

  drawImg(ctx) {
    ctx.drawImage(this.shipImg, this.pos.x, this.pos.y, this.width, this.height);
    this.bullets.draw(ctx);
  }
}