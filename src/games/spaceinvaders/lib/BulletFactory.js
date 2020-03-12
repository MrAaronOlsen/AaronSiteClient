export default class BulletFactory {

  constructor() {
    this.bullets = [];
  }

  setLimit(limit) {
    this.limit = limit;
    return this;
  }

  setFactory(factory) {
    this.factory = factory;
    return this;
  }

  addBullet(pos) {
    if (this.limit && this.bullets.length === this.limit) {
      return;
    }

    this.bullets.push(this.factory(pos));
  }

  update() {
    this.bullets.forEach((bullet, i) => {

      if (bullet.isDestroyed()) {
        this.bullets[i] = null;
        return;
      }

      bullet.update()
    });

    this.bullets = this.bullets.filter((bullet) => {
      return bullet != null
    })
  }

  draw(ctx) {
    this.bullets.forEach((bullet) => {
      bullet.draw(ctx)
    });
  }
}