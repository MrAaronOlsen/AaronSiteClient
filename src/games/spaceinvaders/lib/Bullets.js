const laserUrl = 'https://aaron-site.s3-us-west-1.amazonaws.com/game-assets/space-invaders/bullets/player-laser-01-32.png'

import Vector from 'games/core/Vector.js';
import Bullet from './Bullet.js';


export default class Bullets {

  constructor() {
    this.playerBullet;

    this.playerLaserAsset = new Image();
    this.playerLaserAsset.src = laserUrl;
  }

  addPlayerShot(pos) {
    if (!this.playerBullet) {
      var bullet = new Bullet(this.playerLaserAsset, pos, new Vector(0, -6));
      bullet.configure(3, 16);
      bullet.centerX();
      bullet.alignBottom();

      this.playerBullets.addCollidable(bullet);
      this.playerBullet = bullet;
    }
  }

  setCollisionGroups(playerBullets, mobBullets) {
    this.playerBullets = playerBullets;
    this.mobBullets = mobBullets;
  }

  removePlayerShot() {
    if (this.playerBullet) {
      this.playerBullet.markDestroy();
    }
  }

  update() {
    if (this.playerBullet) {
      this.updatePlayerBullet();
    }
  }

  updatePlayerBullet() {
    if (this.playerBullet.isDestroyed()) {
      this.playerBullet = null;
      return;
    }

    if (this.playerBullet.pos.y <= 0) {
      this.removePlayerShot()
    } else {
      this.playerBullet.update()
    }
  }

  draw(ctx) {
    if (this.playerBullet) {
      this.playerBullet.draw(ctx)
    }
  }
}