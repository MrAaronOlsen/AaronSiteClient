import Vector from 'games/core/Vector.js'
import Collidable from './Collidable.js'

const PADDING = 16;
const CENTER = new Vector(PADDING / 2, PADDING / 2);

export default class Mob extends Collidable {

  constructor(asset, gridSize) {
    super()

    this.asset = asset
    this.gridSize = gridSize;

    this.width = this.gridSize - PADDING;
    this.height = this.width;
  }

  update(col, line, offset) {
    if (this.pos) {
      this.prevPos = this.pos.clone()
    }

    this.pos = new Vector(col * this.gridSize, line * this.gridSize).plus(offset).plus(CENTER);
  }

  draw(ctx) {
    if (!this.pos) {
      return;
    }

    if (this.prevPos) {
      ctx.clearRect(this.prevPos.x - 1, this.prevPos.y - 1, this.width + 2, this.height + 2);
    }

    if (this.markedDestroy) {
      this.destroyed = true;
      return;
    }

    ctx.drawImage(this.asset, this.pos.x, this.pos.y, this.width, this.height);
  }
}