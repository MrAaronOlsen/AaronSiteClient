export default class CollisionGroup {

  constructor() {
    this.collidables = []
  }

  addCollidable(collidable) {
    this.collidables.push(collidable)
  }

  removeCollidable(i) {
    this.collidables[i] = null;
  }

  getCollidables() {
    return this.collidables;
  }

  clean() {
    this.collidables = this.collidables.filter(c => {
      return c != null;
    })
  }
}