const shipImg = 'https://aaron-site.s3-us-west-1.amazonaws.com/game-assets/space-invaders/mobs/ship-01-64.png'

import Vector from 'games/core/Vector.js'

export default class Player {
  constructor() {
    this.ship = new Image()
    this.ship.src = shipImg
  }

  configure(width, height, scale) {
    this.gameWidth = width;
    this.gameHeight = height;

    this.playerWidth = this.gameWidth / scale
    this.playerHeight = this.gameHeight / scale

    this.pos = new Vector((this.gameWidth / 2) - (this.playerWidth / 2), this.gameHeight - this.playerHeight)
    this.lastPos = this.pos.clone()
    this.vel = new Vector(0, 0)
  }

  update() {
    this.lastPos = this.pos.clone()

    if (this.pos.x > (this.gameWidth - this.playerWidth) && this.vel.x > 0 || this.pos.x < 0 && this.vel.x < 0) {
      return
    }

    this.pos.add(this.vel)
  }

  check(controller) {
    if (controller.left()) {
      this.vel = new Vector(-5, 0)
    } else if (controller.right()) {
      this.vel = new Vector(5, 0)
    } else {
      this.vel = new Vector(0, 0)
    }
  }

  draw(ctx) {
    ctx.clearRect(this.lastPos.x, this.lastPos.y, this.playerWidth, this.playerHeight);
    ctx.drawImage(this.ship, this.pos.x, this.pos.y, this.playerWidth, this.playerHeight);
  }
}