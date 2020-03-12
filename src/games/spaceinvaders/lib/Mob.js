import { Vector } from 'game_core'

import GameAsset from './GameAsset.js'

const PADDING = 16;
const CENTER = new Vector(PADDING / 2, PADDING / 2);

export default class Mob extends GameAsset {
  loc;

  constructor(asset, loc, size) {
    super()

    this.asset = asset
    this.size = size;
    this.loc = loc.times(size);

    this.width = this.size - PADDING;
    this.height = this.width;
  }

  update(offset) {
    if (this.pos) {
      this.prevPos = this.pos.clone()
    }

    this.pos = this.loc.plus(offset).plus(CENTER);
  }

  clearImg(ctx) {
    if (this.prevPos) {
      ctx.clearRect(this.prevPos.x - 1, this.prevPos.y - 1, this.width + 2, this.height + 2);
    }
  }

  drawImg(ctx) {
    if (this.pos) {
      ctx.drawImage(this.asset, this.pos.x, this.pos.y, this.width, this.height);
    }
  }
}