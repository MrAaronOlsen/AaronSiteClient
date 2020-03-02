const playerUrl = 'https://aaron-site.s3-us-west-1.amazonaws.com/game-assets/space-invaders/mobs/fighter-jet.png'

import Vector from './Vector.js'

export default class Player {
  constructor() {
    this.pos = new Vector(300, 600)
    this.lastPos = new Vector(300, 600)
    this.vel = new Vector(0, 0)

    this.ship = new Image()
    this.ship.src = playerUrl
  }

  update() {
    this.lastPos = this.pos.clone()

    if (this.pos.x > 600 && this.vel.x > 0 || this.pos.x < 0 && this.vel.x < 0) {

    } else {
      this.pos.add(this.vel)
    }
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
    ctx.clearRect(this.lastPos.x, this.lastPos.y, 100, 100);
    ctx.drawImage(this.ship, this.pos.x, this.pos.y, 100, 100);
  }
}