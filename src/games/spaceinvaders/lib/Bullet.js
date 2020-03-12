import { Collidable } from 'game_core'

export default class Bullet extends Collidable {

  constructor(asset, pos, vel) {
    super()

    this.asset = asset;
    this.vel = vel;
    this.pos = pos;
  }

  configure(width, height) {
    this.width = width;
    this.height = height;
  }

  centerX() {
    this.pos.x = this.pos.x - (this.width / 2)
  }

  alignBottom() {
    this.pos.y = this.pos.y - this.height
  }

  update() {
    this.lastPos = this.pos.clone()
    this.pos.add(this.vel);
  }

  clearImg(ctx) {
    if (this.lastPos) {
      ctx.clearRect(this.lastPos.x, this.lastPos.y, this.width, this.height);
    }
  }

  draw(ctx) {
    this.clearImg(ctx)

    if (this.markedDestroy) {
      this.destroyed = true;
      return;
    }

    ctx.drawImage(this.asset, this.pos.x, this.pos.y, this.width, this.height);
  }
}