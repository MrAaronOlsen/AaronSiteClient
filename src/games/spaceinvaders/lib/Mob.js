import Vector from 'games/core/Vector.js'

export default class Mob {

  constructor(asset, size) {
    this.asset = asset
    this.size = size - 10;
  }

  update() {

  }

  draw(ctx, pos) {
    var centeredPos = pos.plus(new Vector(5, 5))

    if (this.prevPos) {
      ctx.clearRect(this.prevPos.x, this.prevPos.y, this.size, this.size);
    }

    ctx.drawImage(this.asset, centeredPos.x, centeredPos.y, this.size, this.size);

    this.prevPos = centeredPos.clone()
  }
}