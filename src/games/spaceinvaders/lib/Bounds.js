import { Collidable } from 'game_core';

export default class Bounds extends Collidable {
  constructor(width, height) {
    super()

    this.width = width;
    this.height = height;
  }

  isBounds() {
    return true;
  }
}