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

  isMarkedDestroy() {
    if (this.markedDestroy) {
      this.destroy();
    }

    return this.isDestroyed();
  }

  destroy() {
    this.destroyed = true;
  }

  isDestroyed() {
    return this.destroyed;
  }

  isBounds() {
    return false;
  }
}