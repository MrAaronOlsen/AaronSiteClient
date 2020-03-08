const shipUrl = 'https://aaron-site.s3-us-west-1.amazonaws.com/game-assets/space-invaders/mobs/ship-01-64.png'

import Collidable from './Collidable.js'
import Vector from 'games/core/Vector.js'

export default class Player extends Collidable {
  constructor() {
    super()

    this.ship = new Image()
    this.ship.src = shipUrl
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

  setBullets(bullets) {
    this.bullets = bullets;
  }

  update() {
    this.lastPos = this.pos.clone()

    if (this.pos.x > (this.gameWidth - this.width) && this.vel.x > 0 || this.pos.x < 0 && this.vel.x < 0) {
      return
    }

    this.pos.add(this.vel)
  }

  check(controller) {
    if (controller.left()) {
      this.vel = new Vector(-5, 0)
    } else if (controller.right()) {
      this.vel = new Vector(5, 0)
    } else if (controller.space()) {
      this.bullets.addPlayerShot(this.pos.plus(new Vector(this.width / 2), 0));
    } else {
      this.vel = new Vector(0, 0)
    }
  }

  draw(ctx) {
    ctx.clearRect(this.lastPos.x, this.lastPos.y, this.width, this.height);
    ctx.drawImage(this.ship, this.pos.x, this.pos.y, this.width, this.height);
  }
}