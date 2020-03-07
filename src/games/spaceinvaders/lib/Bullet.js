
export default class Bullet {

  constructor(asset, pos, vel) {
    this.asset = asset;
    this.vel = vel;
    this.pos = pos;

    this.markedDestroy = false;
    this.destroyed = false;
  }

  configure(width, height) {
    this.width = width;
    this.height = height;
  }

  centerX() {
    this.pos.x = this.pos.x - (this.width / 2)
  }

  alightBottom() {
    this.pos.y = this.pos.y - this.height
  }

  update() {
    this.lastPos = this.pos.clone()
    this.pos.add(this.vel);
  }

  markDestroy() {
    this.markedDestroy = true;
  }

  isDestroyed() {
    return this.destroyed;
  }

  clear(ctx) {
    if (this.lastPos) {
      ctx.clearRect(this.lastPos.x, this.lastPos.y, this.width, this.height);
      ctx.clearRect(this.pos.x, this.pos.y, this.width, this.height);
    }
  }

  draw(ctx) {
    this.clear(ctx)

    if (this.markedDestroy) {
      this.destroyed = true;
      return;
    }

    ctx.drawImage(this.asset, this.pos.x, this.pos.y, this.width, this.height);
  }
}