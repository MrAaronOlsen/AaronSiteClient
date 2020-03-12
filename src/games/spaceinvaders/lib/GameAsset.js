import { Collidable } from 'game_core'

export default class GameAsset extends Collidable {

  constructor() {
    super()
  }

  draw(ctx) {
    this.clearImg(ctx);

    if (this.isMarkedDestroy()) {
      return;
    }

    this.drawImg(ctx);
  }

  clearImg() {
    throw "clearImg() method must be implemented when extending GameAsset class."
  }

  drawImg() {
    throw "drawImg() method must be implemented when extending GameAsset class."
  }
}