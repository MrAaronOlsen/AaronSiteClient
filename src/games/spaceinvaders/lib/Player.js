const shipUrl = 'https://aaron-site.s3-us-west-1.amazonaws.com/game-assets/space-invaders/mobs/ship-01-64.png'
const playerLaserUrl = 'https://aaron-site.s3-us-west-1.amazonaws.com/game-assets/space-invaders/bullets/player-laser-01-32.png'

import { Collidable, Vector } from 'game_core'
import BulletFactory from './BulletFactory.js';
import Bullet from './Bullet.js';

export default class Player extends Collidable {
  constructor() {
    super()

    this.ship = new Image()
    this.ship.src = shipUrl

    this.playerLaserAsset = new Image();
    this.playerLaserAsset.src = playerLaserUrl;
  }

  configure(width, height, scale) {
    this.gameWidth = width;
    this.gameHeight = height;

    this.width = this.gameWidth / scale
    this.height = this.gameHeight / scale

    this.pos = new Vector((this.gameWidth / 2) - (this.width / 2), this.gameHeight - this.height)
    this.lastPos = this.pos.clone()
    this.vel = new Vector(0, 0)
  }

  setCollider(collider) {
    this.collider = collider;
    this.collider.addCollidable("player", this);

    this.bullets = new BulletFactory()
      .setLimit(1)
      .setFactory(pos => {
        var bullet = new Bullet(this.playerLaserAsset, pos, new Vector(0, -10));
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

  draw(ctx) {
    ctx.clearRect(this.lastPos.x, this.lastPos.y, this.width, this.height);

    if (this.markedDestroy) {
      this.destroyed = true;
      return;
    }

    ctx.drawImage(this.ship, this.pos.x, this.pos.y, this.width, this.height);
    this.bullets.draw(ctx);
  }
}