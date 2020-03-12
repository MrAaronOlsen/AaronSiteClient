export default class Collidable {
  pos;
  width;
  height;

  constructor() {
    this.markedDestroy = false;
    this.destroyed = false;
  }

  markDestroy() {
    this.markedDestroy = true;
  }

  isDestroyed() {
    return this.destroyed;
  }

  isBounds() {
    return false;
  }
}